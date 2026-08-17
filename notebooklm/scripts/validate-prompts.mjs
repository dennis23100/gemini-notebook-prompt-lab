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
assert(prompts.length === 90, `expected 90 built-in prompts; found ${prompts.length}`);
assert(workflows.length === 10, `expected 10 workflows; found ${workflows.length}`);

const ids = new Set();
const themeGroups = new Map();
const ages = new Map();
const unsafeTokens = [
  'DATA_SPREADSHEET_ID',
  'script.google.com/macros/s/',
  'docs.google.com/spreadsheets/d/'
];

for (const [index, item] of prompts.entries()) {
  const where = `prompt[${index}] ${item.id ?? '(missing id)'}`;
  for (const field of ['id','themeId','ageGroup','title','summary','category','prompt','sources']) {
    assert(item[field] !== undefined && item[field] !== null && item[field] !== '', `${where}: missing ${field}`);
  }
  assert(!ids.has(item.id), `${where}: duplicate id`);
  ids.add(item.id);
  assert(['children','youth','adult'].includes(item.ageGroup), `${where}: invalid ageGroup ${item.ageGroup}`);
  assert(typeof item.title?.['zh-TW'] === 'string' && typeof item.title?.en === 'string', `${where}: bilingual title required`);
  assert(typeof item.summary?.['zh-TW'] === 'string' && typeof item.summary?.en === 'string', `${where}: bilingual summary required`);
  assert(typeof item.category?.['zh-TW'] === 'string' && typeof item.category?.en === 'string', `${where}: bilingual category required`);
  assert(Array.isArray(item.sources) && item.sources.length > 0, `${where}: provenance sources required`);
  assert(/use only|selected sources|uploaded source/i.test(item.prompt), `${where}: source-grounding instruction not detected`);
  assert(/do not invent|don't invent|not supported by the source|source does not/i.test(item.prompt), `${where}: anti-invention behavior not detected`);
  assert(item.prompt.includes(`using the ${item.title.en} visual direction.`), `${where}: canonical English theme name is missing from prompt`);
  assert(!/output language should match the user's prompt and source language/i.test(item.prompt), `${where}: ambiguous source-language output rule detected`);
  assert(!/[\u3400-\u9fff]/u.test(item.prompt), `${where}: built-in prompt must remain canonical English`);
  for (const token of unsafeTokens) {
    assert(!String(item.prompt).includes(token), `${where}: contains private/deployment token ${token}`);
    assert(!JSON.stringify(item).includes(token), `${where}: metadata contains private/deployment token ${token}`);
  }
  if (/迪士尼|Disney/i.test(item.title?.['zh-TW'] + item.title?.en + item.prompt)) {
    errors.push(`${where}: branded Disney style should be genericized`);
  }
  const list = themeGroups.get(item.themeId) ?? [];
  list.push(item);
  themeGroups.set(item.themeId, list);
  ages.set(item.ageGroup, (ages.get(item.ageGroup) ?? 0) + 1);
}

assert(themeGroups.size === 30, `expected 30 themes; found ${themeGroups.size}`);
for (const [themeId, items] of themeGroups) {
  assert(items.length === 3, `theme ${themeId}: expected 3 age variants; found ${items.length}`);
  const set = new Set(items.map((x) => x.ageGroup));
  assert(set.size === 3 && ['children','youth','adult'].every((age) => set.has(age)), `theme ${themeId}: missing age variant`);
}
for (const age of ['children','youth','adult']) {
  assert(ages.get(age) === 30, `age ${age}: expected 30 prompts; found ${ages.get(age) ?? 0}`);
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

if (data.ageGroups?.some?.((x) => /35/.test(JSON.stringify(x)))) {
  warn.push('age profiles preserve the original workbook ranges; they overlap at age 35 and are documented as configurable defaults');
}

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
