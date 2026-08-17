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
  if (item.ageGroup === 'youth') {
    assert(/ages 16 to 34/i.test(item.prompt), `${where}: youth range must be 16 to 34`);
    assert(!/ages 16 to 35/i.test(item.prompt), `${where}: overlapping youth range detected`);
  }
  if (item.ageGroup === 'adult') {
    assert(/adults aged 35 and above/i.test(item.prompt), `${where}: adult range must begin at 35`);
    assert(!/mature, steady, warm, dignified|Use calm pacing/i.test(item.prompt), `${where}: legacy low-energy adult rule detected`);
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
}
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
