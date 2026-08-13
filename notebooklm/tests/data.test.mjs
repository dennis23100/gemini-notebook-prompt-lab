import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const promptManifest = JSON.parse(await readFile(resolve(root, 'data/prompts.json'), 'utf8'));
const promptPacks = await Promise.all(promptManifest.packs.map(async pack => JSON.parse(await readFile(resolve(root, pack.path.replace(/^\.\//, '')), 'utf8'))));
const prompts = promptPacks.flatMap(pack => pack.prompts);
const workflows = JSON.parse(await readFile(resolve(root, 'data/workflows.json'), 'utf8')).workflows;

test('every theme has children, youth, and adult variants', () => {
  const themes = new Map();
  for (const p of prompts) {
    if (!themes.has(p.themeId)) themes.set(p.themeId, new Set());
    themes.get(p.themeId).add(p.ageGroup);
  }
  assert.equal(themes.size, 30);
  for (const [theme, ages] of themes) {
    assert.deepEqual([...ages].sort(), ['adult', 'children', 'youth'], theme);
  }
});

test('all built-in prompts are source-grounded and contain a missing-information guard', () => {
  for (const p of prompts) {
    assert.match(p.prompt, /use only|selected sources|uploaded source/i, p.id);
    assert.match(p.prompt, /do not invent|don't invent|not supported by the source|source does not/i, p.id);
  }
});

test('workflow ids are unique and include current core Studio/companion tasks', () => {
  const ids = workflows.map((w) => w.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ['slide-deck','audio-overview','video-overview','infographic','quiz','flashcards','report','data-table','chat','mind-map']) {
    assert.ok(ids.includes(id), id);
  }
});

test('public project data does not contain the private spreadsheet id or old Apps Script endpoint marker', async () => {
  const paths = ['data/prompts.json', ...promptManifest.packs.map(p => p.path.replace(/^\.\//, '')), 'data/workflows.json','assets/app.js','index.html'];
  for (const path of paths) {
    const text = await readFile(resolve(root, path), 'utf8');
    assert.doesNotMatch(text, /DATA_SPREADSHEET_ID|docs\.google\.com\/spreadsheets\/d\//, path);
    assert.doesNotMatch(text, /script\.google\.com\/macros\/s\//, path);
  }
});
