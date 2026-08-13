import { readdir, readFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const repoRoot = resolve(projectRoot, '..');
const packsDir = join(projectRoot, 'data', 'packs');
const sourcePath = join(repoRoot, 'docs', 'showcase', 'source.md');
const outputDir = join(repoRoot, 'docs', 'showcase', 'generated-prompts');

const THEME_TARGETS = [
  {
    key: 'flexible-comic',
    label: 'Flexible Comic',
    aliases: ['flexible comic', 'comic flexible', 'comic (flexible)', '漫畫（不拘）', '漫畫 (不拘)']
  },
  {
    key: 'technology',
    label: 'Technology',
    aliases: ['technology', '科技']
  },
  {
    key: 'ink-wash',
    label: 'Ink Wash',
    aliases: ['ink wash', 'ink-wash', 'inkwash', '水墨']
  }
];

const AUDIENCE_TARGETS = [
  { key: 'children', label: 'Children', aliases: ['children', 'child', 'kids', 'kid'] },
  { key: 'youth', label: 'Youth', aliases: ['youth', 'young adult', 'young-adult', 'young'] },
  { key: 'adults', label: 'Adults', aliases: ['adult', 'adults', 'mature', 'older adult'] }
];

function normalize(value) {
  return String(value ?? '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

function collectPromptObjects(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectPromptObjects(item, out);
    return out;
  }
  if (!value || typeof value !== 'object') return out;

  if (
    typeof value.id === 'string' &&
    typeof value.prompt === 'string' &&
    typeof value.ageGroup === 'string'
  ) {
    out.push(value);
  }

  for (const child of Object.values(value)) collectPromptObjects(child, out);
  return out;
}

function titleText(prompt) {
  const title = prompt.title;
  const values = [];
  if (typeof title === 'string') values.push(title);
  if (title && typeof title === 'object') values.push(...Object.values(title));
  if (prompt.themeId) values.push(prompt.themeId);
  return normalize(values.filter(Boolean).join(' | '));
}

function audienceText(prompt) {
  return normalize(prompt.ageGroup);
}

function matchesAny(text, aliases) {
  return aliases.some(alias => text.includes(normalize(alias)));
}

async function loadPrompts() {
  const files = (await readdir(packsDir))
    .filter(name => name.endsWith('.json'))
    .sort();

  const prompts = [];
  for (const file of files) {
    const raw = await readFile(join(packsDir, file), 'utf8');
    const parsed = JSON.parse(raw);
    for (const prompt of collectPromptObjects(parsed)) {
      prompts.push({ ...prompt, __packFile: file });
    }
  }
  return prompts;
}

function findOne(prompts, theme, audience) {
  const candidates = prompts.filter(prompt => {
    return matchesAny(titleText(prompt), theme.aliases) &&
      matchesAny(audienceText(prompt), audience.aliases);
  });

  if (candidates.length !== 1) {
    const details = candidates.map(p => `${p.id} (${p.__packFile})`).join(', ') || 'none';
    throw new Error(
      `Expected exactly one prompt for ${theme.label} / ${audience.label}; found ${candidates.length}: ${details}`
    );
  }
  return candidates[0];
}

function promptMarkdown({ caseId, theme, audience, prompt, sourceSha256 }) {
  return `# ${theme.label} — ${audience.label}\n\n` +
    `**Case ID:** \`${caseId}\`  \n` +
    `**Prompt ID:** \`${prompt.id}\`  \n` +
    `**Prompt pack:** \`${prompt.__packFile}\`  \n` +
    `**Demo source:** \`docs/showcase/source.md\`  \n` +
    `**Source SHA-256:** \`${sourceSha256}\`\n\n` +
    `## Reproduction steps\n\n` +
    `1. Add \`docs/showcase/source.md\` to Gemini Notebook.\n` +
    `2. Copy the prompt below without adding extra facts.\n` +
    `3. Generate the presentation/slide output.\n` +
    `4. Save one representative example image and record the generation date.\n\n` +
    `## Prompt\n\n` +
    `\`\`\`text\n${prompt.prompt.trim()}\n\`\`\`\n\n` +
    `## Public example disclaimer\n\n` +
    `> Example output produced from the documented source + prompt workflow. Gemini Notebook output can vary by source, product version, settings, and generation run.\n`;
}

const prompts = await loadPrompts();
const source = await readFile(sourcePath, 'utf8');
const sourceSha256 = createHash('sha256').update(source).digest('hex');
const cases = [];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const theme of THEME_TARGETS) {
  for (const audience of AUDIENCE_TARGETS) {
    const prompt = findOne(prompts, theme, audience);
    const caseId = `${theme.key}-${audience.key}`;
    const fileName = `${caseId}.md`;

    await writeFile(
      join(outputDir, fileName),
      promptMarkdown({ caseId, theme, audience, prompt, sourceSha256 }),
      'utf8'
    );

    cases.push({
      caseId,
      theme: theme.label,
      audience: audience.label,
      promptId: prompt.id,
      promptPack: prompt.__packFile,
      promptFile: `docs/showcase/generated-prompts/${fileName}`,
      source: 'docs/showcase/source.md',
      sourceSha256,
      outputAsset: null,
      generatedAt: null,
      status: 'awaiting-real-output'
    });
  }
}

await writeFile(
  join(outputDir, 'cases.json'),
  `${JSON.stringify({ schemaVersion: 1, cases }, null, 2)}\n`,
  'utf8'
);

await writeFile(
  join(outputDir, 'README.md'),
  `# Generated Showcase Prompts\n\nThis directory is generated by \`npm run showcase:export\`.\n\nIt contains exactly **${cases.length}** reproducible showcase cases derived from the current prompt packs. Do not hand-edit generated prompt files; change the source prompt data or exporter instead.\n`,
  'utf8'
);

console.log(`Prepared ${cases.length} showcase cases in ${outputDir}`);
for (const item of cases) console.log(`${item.caseId}: ${item.promptId}`);
