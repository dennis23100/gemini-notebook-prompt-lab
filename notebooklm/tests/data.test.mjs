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
  assert.equal(themes.size, promptManifest.counts.themes);
  for (const [theme, ages] of themes) {
    assert.deepEqual([...ages].sort(), ['adult', 'children', 'youth'], theme);
  }
});

test('audience ranges are non-overlapping and every theme has distinct age art direction', () => {
  const directions = new Map();
  for (const p of prompts) {
    assert.match(p.prompt, /Audience Art Direction:/i, p.id);
    const direction = p.prompt.match(/Audience Art Direction:\s*([^\n]+)/i)?.[1];
    const set = directions.get(p.themeId) || new Set();
    set.add(direction);
    directions.set(p.themeId, set);

    if (p.ageGroup === 'youth') {
      assert.match(p.prompt, /ages 16 to 34/i, p.id);
      assert.doesNotMatch(p.prompt, /ages 16 to 35/i, p.id);
    }
    if (p.ageGroup === 'adult') {
      assert.match(p.prompt, /adults aged 35 and above/i, p.id);
      assert.doesNotMatch(p.prompt, /mature, steady, warm, dignified|use calm pacing/i, p.id);
    }
  }
  for (const [themeId, values] of directions) assert.equal(values.size, 3, themeId);
  assert.equal(promptManifest.ageGroups.find(item => item.id === 'youth')?.rangeEn, '16–34');
});

test('theme discovery metadata is complete and named franchises stay out of built-in prompts', () => {
  const banned = /\b(?:Pikmin|One Piece|Pok[eé]mon|Disney|Pixar|Ghibli)\b|皮克敏|航海王|寶可夢|迪士尼|吉卜力/i;
  for (const p of prompts) {
    assert.ok(p.vibe, `${p.id}: vibe`);
    assert.ok(p.energy, `${p.id}: energy`);
    assert.ok(Array.isArray(p.collections), `${p.id}: collections`);
    assert.doesNotMatch(`${p.title.en} ${p.title['zh-TW']} ${p.prompt}`, banned, p.id);
  }
  const newThemeIds = new Set(prompts.filter(prompt => prompt.collections.includes('new')).map(prompt => prompt.themeId));
  assert.equal(newThemeIds.size, 14);
  assert.ok(prompts.some(prompt => prompt.collections.includes('kids-favorite')));
  assert.ok(prompts.some(prompt => prompt.collections.includes('adult-vivid')));
});

test('all built-in prompts are source-grounded and contain a missing-information guard', () => {
  for (const p of prompts) {
    assert.match(p.prompt, /use only|selected sources|uploaded source/i, p.id);
    assert.match(p.prompt, /do not invent|don't invent|not supported by the source|source does not/i, p.id);
  }
});

test('built-in prompt instructions stay canonical English and do not infer output language from sources', () => {
  for (const p of prompts) {
    assert.ok(p.prompt.includes(`using the ${p.title.en} visual direction.`), p.id);
    assert.doesNotMatch(p.prompt, /output language should match the user's prompt and source language/i, p.id);
    assert.doesNotMatch(p.prompt, /[\u3400-\u9fff]/u, p.id);
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
