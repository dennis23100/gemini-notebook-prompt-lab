import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { applyOutputLanguage } from '../assets/prompt-language.js';

const root = resolve(import.meta.dirname, '..');
const promptManifest = JSON.parse(await readFile(resolve(root, 'data/prompts.json'), 'utf8'));
const promptPacks = await Promise.all(promptManifest.packs.map(async pack => JSON.parse(await readFile(resolve(root, pack.path.replace(/^\.\//, '')), 'utf8'))));
const prompts = promptPacks.flatMap(pack => pack.prompts);
const workflows = JSON.parse(await readFile(resolve(root, 'data/workflows.json'), 'utf8')).workflows;
const oneLineSection = (prompt, heading) => prompt.match(new RegExp(`${heading}:\\s*([^\\n]+)`, 'i'))?.[1]?.trim();

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

test('age art direction stays distinctive without flattening every theme into one template', () => {
  for (const p of prompts) {
    if (p.ageGroup === 'children') {
      assert.match(p.prompt, /cute, dreamy, playful/i, p.id);
      assert.match(p.prompt, /cartoon-forward/i, p.id);
      assert.match(p.prompt, /age-level visual language rather than a fixed template/i, p.id);
      assert.match(p.prompt, /selected theme determine the story world, motifs, palette, subjects, medium, and layout/i, p.id);
    }
    if (p.ageGroup === 'youth') {
      assert.match(p.prompt, /premium original stylized-animation language/i, p.id);
      assert.match(p.prompt, /cinematic cel animation, refined anime-inspired illustration, manga or graphic-novel sequencing, luminous fantasy animation, or polished painterly animation/i, p.id);
      assert.match(p.prompt, /broad gender-inclusive appeal/i, p.id);
      assert.match(p.prompt, /anime influence is a quality and visual-energy reference, not a command to make every deck use the same drawing style or character scene/i, p.id);
      assert.match(p.prompt, /selected theme must determine the visual mode, setting, motifs, palette, era, subjects, and layout/i, p.id);
      assert.match(p.prompt, /preserve the theme-specific visual identity instead of applying one universal anime template/i, p.id);
      assert.match(p.prompt, /do not default to a lone young character, city rooftop, sunset, glowing eyes, manga panels, fantasy scenery, or hero-poster composition/i, p.id);
      assert.match(p.prompt, /avoid stock-photo realism/i, p.id);
    }
    if (p.ageGroup === 'adult') {
      assert.match(p.prompt, /mature, tasteful/i, p.id);
      assert.match(p.prompt, /semi-realistic illustration, cinematic painterly scenes, or refined 2D\/3D hybrid art/i, p.id);
      assert.match(p.prompt, /slightly idealized environments rather than ordinary real-world photography/i, p.id);
      assert.match(p.prompt, /maturity and rendering standard rather than one luxury template/i, p.id);
      assert.match(p.prompt, /let the selected theme determine the setting, palette, cultural texture, subjects, medium, and composition/i, p.id);
    }
  }
});

test('source, theme, and audience roles stay separate in every generated prompt', () => {
  for (const p of prompts) {
    assert.match(p.prompt, /Visual Priority - NON-NEGOTIABLE:/i, p.id);
    assert.match(p.prompt, /source controls facts\/message/i, p.id);
    assert.match(p.prompt, /theme controls visual grammar, medium, motifs, spatial logic and layout/i, p.id);
    assert.match(p.prompt, /audience controls readability, safety, density and rendering maturity/i, p.id);
    assert.match(p.prompt, /Theme Identity Lock - NON-NEGOTIABLE:/i, p.id);
    assert.match(p.prompt, /Content-Theme Boundary:/i, p.id);
    assert.match(p.prompt, /Source remains the factual subject/i, p.id);
    assert.match(p.prompt, /use the theme only as visual grammar and navigation, never as a new story or claim/i, p.id);
    assert.match(p.prompt, /Slide Variety Plan:/i, p.id);
    assert.match(p.prompt, /do not repeat the same hero composition, room, scene, character pose, palette wash, decorative prop, or information layout/i, p.id);
    assert.match(p.prompt, /Each major visual must clarify a source idea; decoration must not become the topic/i, p.id);
  }
});

test('recurring people and creatures keep one visual identity across slides', () => {
  for (const p of prompts) {
    assert.match(p.prompt, /Character Continuity - REQUIRED:/i, p.id);
    assert.match(p.prompt, /use sourced\/user-specified traits/i, p.id);
    assert.match(p.prompt, /choose neutral original visual anchors once before rendering/i, p.id);
    assert.match(p.prompt, /age range, face, hair, proportions, clothing silhouette\/colors and accessories/i, p.id);
    assert.match(p.prompt, /Reuse them unchanged across slides/i, p.id);
    assert.match(p.prompt, /Change identity or appearance only when the source requires it/i, p.id);
    assert.match(p.prompt, /keep multiple figures distinct/i, p.id);
  }
});

test('all forty-four themes have a unique identity lock and stable theme grammar across ages', () => {
  const locksByTheme = new Map();
  const directionsByTheme = new Map();

  for (const p of prompts) {
    const lock = oneLineSection(p.prompt, 'Theme Identity Lock - NON-NEGOTIABLE');
    const direction = oneLineSection(p.prompt, 'Theme Direction');
    assert.ok(lock, `${p.id}: identity lock`);
    assert.ok(direction, `${p.id}: theme direction`);

    if (!locksByTheme.has(p.themeId)) locksByTheme.set(p.themeId, new Set());
    if (!directionsByTheme.has(p.themeId)) directionsByTheme.set(p.themeId, new Set());
    locksByTheme.get(p.themeId).add(lock);
    directionsByTheme.get(p.themeId).add(direction);
  }

  for (const [themeId, locks] of locksByTheme) assert.equal(locks.size, 1, `${themeId}: one identity across ages`);
  for (const [themeId, directions] of directionsByTheme) assert.equal(directions.size, 1, `${themeId}: one direction across ages`);
  assert.equal(new Set([...locksByTheme.values()].map(values => [...values][0])).size, promptManifest.counts.themes);
  assert.equal(new Set([...directionsByTheme.values()].map(values => [...values][0])).size, promptManifest.counts.themes);
});

test('Art & Exhibition addresses the repeated gallery-room failure without losing age differentiation', () => {
  const variants = Object.fromEntries(prompts.filter(p => p.themeId === 'art').map(p => [p.ageGroup, p.prompt]));
  for (const [age, prompt] of Object.entries(variants)) {
    assert.match(prompt, /illustrated exhibition poster, framed narrative painting, paper-cut collage, tactile sculpture or assemblage, mural, light-and-color installation, and sketchbook or process wall/i, age);
    assert.match(prompt, /different source-supported idea/i, age);
    assert.match(prompt, /full-bleed artwork, curated gallery wall, diptych or triptych, process board, material close-up, installation view/i, age);
    assert.match(prompt, /beige or white gallery room/i, age);
    assert.match(prompt, /glossy clay-like 3D toys/i, age);
    assert.match(prompt, /text placed on floors, curved props, or low-contrast scenery/i, age);
  }
  assert.match(variants.children, /imaginative curated art walk and hands-on making workshop/i);
  assert.match(variants.children, /not a blanket pastel-rainbow 3D-toy look/i);
  assert.match(variants.youth, /contemporary exhibition combining cel-painted or anime-inspired illustration, zine energy, kinetic type, mixed-media collage/i);
  assert.match(variants.adult, /contemporary gallery curation, painterly works, sculptural installation, mixed media, tactile surfaces/i);
});

test('Pixel / Retro Digital uses high-craft pixel worlds rather than a generic retro HUD', () => {
  const variants = Object.fromEntries(prompts.filter(p => p.themeId === 'pixel').map(p => [p.ageGroup, p.prompt]));
  for (const [age, prompt] of Object.entries(variants)) {
    assert.match(prompt, /expressive sprite adventure, layered pixel-diorama drama, or a cozy top-down story world/i, age);
    assert.match(prompt, /crisp intentional pixels, readable original sprite silhouettes, tile-built environments/i, age);
    assert.match(prompt, /parallax planes, atmospheric depth, and cinematic light/i, age);
    assert.match(prompt, /Avoid mixing all pixel submodes on every slide, low-effort mosaic filters, blurry enlarged pixels/i, age);
  }
  assert.match(variants.children, /warm, colorful, storybook-like pixel world/i);
  assert.match(variants.youth, /premium layered pixel scenes/i);
  assert.match(variants.youth, /cool, artful, relaxed, comfortable, and gender-inclusive/i);
  assert.match(variants.adult, /refined pixel-diorama or top-down environmental art/i);
});

test('built-in prompts remain copy-ready after adding an output-language rule', () => {
  for (const p of prompts) {
    for (const language of ['notebook', 'zh-TW', 'en']) {
      assert.ok(applyOutputLanguage(p.prompt, language).length <= 5000, `${p.id} (${language}) exceeds the 5,000-character project budget`);
    }
  }
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
