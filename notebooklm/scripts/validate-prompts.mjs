import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const errors = [];
const warn = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const manifest = await readJson('data/prompts.json');
const packData = await Promise.all((manifest.packs || []).map(pack => readJson(pack.path.replace(/^\.\//, ''))));
const data = {...manifest, prompts: packData.flatMap(pack => pack.prompts || [])};
const workflowData = await readJson('data/workflows.json');
const prompts = data.prompts ?? [];
const workflows = workflowData.workflows ?? [];

assert(data.schemaVersion, 'prompts manifest: schemaVersion is required');
assert(Array.isArray(data.packs) && data.packs.length > 0, 'prompts manifest: packs are required');
assert(prompts.length === data.counts?.prompts, `manifest expected ${data.counts?.prompts} built-in prompts; found ${prompts.length}`);
assert(workflows.length === 10, `expected 10 workflows; found ${workflows.length}`);

const ids = new Set();
const themeGroups = new Map();
const ages = new Map();
const themeIdentityLocks = new Map();
const unsafeTokens = [
  'DATA_SPREADSHEET_ID',
  'script.google.com/macros/s/',
  'docs.google.com/spreadsheets/d/'
];
const allowedVibes = new Set(['dreamy','animated','adventure','playful','cinematic','elegant','editorial','calm','performance','cultural']);
const allowedEnergy = new Set(['gentle','balanced','lively','cinematic']);
const brandedStyle = /\b(?:Pikmin|One Piece|Pok[eé]mon|Disney|Pixar|Ghibli|Marvel|DC Comics)\b|皮克敏|航海王|寶可夢|迪士尼|吉卜力/i;

for (const [index, item] of prompts.entries()) {
  const where = `prompt[${index}] ${item.id ?? '(missing id)'}`;
  for (const field of ['id','themeId','ageGroup','title','summary','category','vibe','energy','collections','prompt','sources']) {
    assert(item[field] !== undefined && item[field] !== null && item[field] !== '', `${where}: missing ${field}`);
  }
  assert(!ids.has(item.id), `${where}: duplicate id`);
  ids.add(item.id);
  assert(['children','youth','adult'].includes(item.ageGroup), `${where}: invalid ageGroup ${item.ageGroup}`);
  assert(typeof item.title?.['zh-TW'] === 'string' && typeof item.title?.en === 'string', `${where}: bilingual title required`);
  assert(typeof item.summary?.['zh-TW'] === 'string' && typeof item.summary?.en === 'string', `${where}: bilingual summary required`);
  assert(typeof item.category?.['zh-TW'] === 'string' && typeof item.category?.en === 'string', `${where}: bilingual category required`);
  assert(Array.isArray(item.sources) && item.sources.length > 0, `${where}: provenance sources required`);
  assert(allowedVibes.has(item.vibe), `${where}: invalid vibe ${item.vibe}`);
  assert(allowedEnergy.has(item.energy), `${where}: invalid energy ${item.energy}`);
  assert(Array.isArray(item.collections), `${where}: collections must be an array`);
  assert(new Set(item.collections || []).size === (item.collections || []).length, `${where}: collections must be unique`);
  assert(/use only|selected sources|uploaded source/i.test(item.prompt), `${where}: source-grounding instruction not detected`);
  assert(/do not invent|don't invent|not supported by the source|source does not/i.test(item.prompt), `${where}: anti-invention behavior not detected`);
  assert(item.prompt.includes(`using the ${item.title.en} visual direction.`), `${where}: canonical English theme name is missing from prompt`);
  assert(!/output language should match the user's prompt and source language/i.test(item.prompt), `${where}: ambiguous source-language output rule detected`);
  assert(!/[\u3400-\u9fff]/u.test(item.prompt), `${where}: built-in prompt must remain canonical English`);
  assert(/Audience Art Direction:/i.test(item.prompt), `${where}: audience-specific art direction required`);
  assert(/Visual Priority - NON-NEGOTIABLE:/i.test(item.prompt), `${where}: visual priority hierarchy required`);
  assert(/source controls facts\/message/i.test(item.prompt), `${where}: source must control factual subject`);
  assert(/theme controls visual grammar, medium, motifs, spatial logic and layout/i.test(item.prompt), `${where}: theme must control visual grammar`);
  assert(/audience controls readability, safety, density and rendering maturity/i.test(item.prompt), `${where}: audience role must be bounded`);
  assert(/Character Continuity - REQUIRED:/i.test(item.prompt), `${where}: recurring character continuity lock required`);
  assert(/choose neutral original visual anchors once before rendering/i.test(item.prompt), `${where}: character identity sheet required`);
  assert(/Reuse them unchanged across slides/i.test(item.prompt), `${where}: cross-slide identity reuse required`);
  assert(/Change identity or appearance only when the source requires it/i.test(item.prompt), `${where}: sourced appearance-change guard required`);
  assert(/keep multiple figures distinct/i.test(item.prompt), `${where}: multi-character distinction required`);
  assert(/Content-Theme Boundary:/i.test(item.prompt), `${where}: content-theme boundary required`);
  assert(/use the theme only as visual grammar and navigation, never as a new story or claim/i.test(item.prompt), `${where}: off-topic theme guardrail required`);
  assert(/Slide Variety Plan:/i.test(item.prompt), `${where}: slide variety plan required`);
  assert(/do not repeat the same hero composition, room, scene, character pose, palette wash, decorative prop, or information layout/i.test(item.prompt), `${where}: repeated-template guardrail required`);
  assert(/Each major visual must clarify a source idea; decoration must not become the topic/i.test(item.prompt), `${where}: decorative-substitution guardrail required`);
  const identityLock = item.prompt.match(/Theme Identity Lock - NON-NEGOTIABLE:\s*([^\n]+)/i)?.[1]?.trim();
  assert(identityLock, `${where}: unique theme identity lock required`);
  const locks = themeIdentityLocks.get(item.themeId) ?? new Set();
  if (identityLock) locks.add(identityLock);
  themeIdentityLocks.set(item.themeId, locks);
  if (item.ageGroup === 'youth') {
    assert(/ages 16 to 34/i.test(item.prompt), `${where}: youth range must be 16 to 34`);
    assert(!/ages 16 to 35/i.test(item.prompt), `${where}: overlapping youth range detected`);
    assert(/premium original stylized-animation language/i.test(item.prompt), `${where}: premium youth animation art direction missing`);
    assert(/cinematic cel animation, refined anime-inspired illustration, manga or graphic-novel sequencing, luminous fantasy animation, or polished painterly animation/i.test(item.prompt), `${where}: youth animation style family missing`);
    assert(/broad gender-inclusive appeal/i.test(item.prompt), `${where}: gender-inclusive youth appeal missing`);
    assert(/anime influence is a quality and visual-energy reference, not a command to make every deck use the same drawing style or character scene/i.test(item.prompt), `${where}: anime quality-reference guardrail missing`);
    assert(/selected theme must determine the visual mode, setting, motifs, palette, era, subjects, and layout/i.test(item.prompt), `${where}: youth theme identity must control the scene`);
    assert(/preserve the theme-specific visual identity instead of applying one universal anime template/i.test(item.prompt), `${where}: youth universal-template guardrail missing`);
    assert(/avoid stock-photo realism/i.test(item.prompt), `${where}: youth stock-photo guardrail missing`);
  }
  if (item.ageGroup === 'adult') {
    assert(/adults aged 35 and above/i.test(item.prompt), `${where}: adult range must begin at 35`);
    assert(!/mature, steady, warm, dignified|Use calm pacing/i.test(item.prompt), `${where}: legacy low-energy adult rule detected`);
    assert(/semi-realistic illustration, cinematic painterly scenes, or refined 2D\/3D hybrid art/i.test(item.prompt), `${where}: adult semi-realistic art direction missing`);
    assert(/maturity and rendering standard rather than one luxury template/i.test(item.prompt), `${where}: adult theme-diversity guardrail missing`);
  }
  if (item.ageGroup === 'children') {
    assert(/cute, dreamy, playful/i.test(item.prompt), `${where}: child dreamlike art direction missing`);
    assert(/age-level visual language rather than a fixed template/i.test(item.prompt), `${where}: child theme-diversity guardrail missing`);
  }
  if (item.preview) {
    assert(item.preview.kind === 'real-output', `${where}: invalid preview kind`);
    assert(/^\.\/assets\/real-previews\/[a-z0-9-]+\.png$/.test(item.preview.src || ''), `${where}: unsafe preview path`);
  }
  for (const token of unsafeTokens) {
    assert(!String(item.prompt).includes(token), `${where}: contains private/deployment token ${token}`);
    assert(!JSON.stringify(item).includes(token), `${where}: metadata contains private/deployment token ${token}`);
  }
  assert(!brandedStyle.test(`${item.title?.['zh-TW']} ${item.title?.en} ${item.prompt}`), `${where}: named franchise or branded style detected`);
  const list = themeGroups.get(item.themeId) ?? [];
  list.push(item);
  themeGroups.set(item.themeId, list);
  ages.set(item.ageGroup, (ages.get(item.ageGroup) ?? 0) + 1);
}

assert(themeGroups.size === data.counts?.themes, `manifest expected ${data.counts?.themes} themes; found ${themeGroups.size}`);
for (const [themeId, items] of themeGroups) {
  assert(items.length === 3, `theme ${themeId}: expected 3 age variants; found ${items.length}`);
  const set = new Set(items.map((x) => x.ageGroup));
  assert(set.size === 3 && ['children','youth','adult'].every((age) => set.has(age)), `theme ${themeId}: missing age variant`);
  const audienceDirections = new Set(items.map(item => item.prompt.match(/Audience Art Direction:\s*([^\n]+)/i)?.[1]).filter(Boolean));
  assert(audienceDirections.size === 3, `theme ${themeId}: audience art directions must differ across all three ages`);
  assert(themeIdentityLocks.get(themeId)?.size === 1, `theme ${themeId}: identity lock must stay consistent across ages`);
}
assert(new Set([...themeIdentityLocks.values()].map(values => [...values][0])).size === data.counts?.themes, 'every theme must have a unique identity lock');
for (const age of ['children','youth','adult']) {
  assert(ages.get(age) === data.counts?.themes, `age ${age}: expected ${data.counts?.themes} prompts; found ${ages.get(age) ?? 0}`);
}

const workflowIds = new Set();
for (const workflow of workflows) {
  assert(workflow.id && !workflowIds.has(workflow.id), `workflow duplicate/missing id: ${workflow.id}`);
  workflowIds.add(workflow.id);
  assert(workflow.name?.['zh-TW'] && workflow.name?.en, `workflow ${workflow.id}: bilingual name required`);
  assert(workflow.description?.['zh-TW'] && workflow.description?.en, `workflow ${workflow.id}: bilingual description required`);
  assert(typeof workflow.starter === 'string' && workflow.starter.length >= 30, `workflow ${workflow.id}: starter prompt too short`);
}

const projectFiles = ['index.html','assets/app.js','README.md','README.zh-TW.md'];
for (const rel of projectFiles) {
  const content = await readFile(resolve(root, rel), 'utf8');
  for (const token of unsafeTokens) assert(!content.includes(token), `${rel}: contains private/deployment token ${token}`);
}

const youthProfile = data.ageGroups?.find?.(item => item.id === 'youth');
assert(youthProfile?.rangeEn === '16–34', `manifest youth range must be 16–34; found ${youthProfile?.rangeEn}`);
assert(!/16[^\d]*35/.test(JSON.stringify(youthProfile || {})), 'manifest youth range overlaps adults at age 35');

if (errors.length) {
  console.error(`Validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`✓ ${prompts.length} prompts`);
console.log(`✓ ${themeGroups.size} themes × 3 age variants`);
console.log(`✓ ${workflows.length} workflows`);
console.log('✓ source-grounding and anti-invention rules detected');
console.log('✓ no known private spreadsheet/deployment identifiers found');
for (const message of warn) console.log(`i ${message}`);
