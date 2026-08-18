import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await readFile(resolve(root, 'data/prompts.json'), 'utf8'));
const packs = await Promise.all(manifest.packs.map(async pack => (
  JSON.parse(await readFile(resolve(root, pack.path.replace(/^\.\//, '')), 'utf8'))
)));
const prompts = packs.flatMap(pack => pack.prompts || []);
const errors = [];
const fail = message => errors.push(message);

const section = (prompt, heading) => prompt.match(new RegExp(`${heading}:\\s*([^\\n]+)`, 'i'))?.[1]?.trim() || '';
const coreSections = prompt => ({
  direction: section(prompt, 'Theme Direction'),
  identity: section(prompt, 'Theme Identity Lock - NON-NEGOTIABLE'),
  boundary: section(prompt, 'Content-Theme Boundary'),
  variety: section(prompt, 'Slide Variety Plan'),
  avoid: section(prompt, 'Avoid')
});

// Each theme must retain concrete medium, spatial, or layout anchors. These are
// deliberately about executable design traits rather than brand/style names.
const signatureAnchors = {
  animals: ['habitat', 'species silhouettes', 'ecosystem'],
  architecture: ['site plan', 'section', 'scale model'],
  art: ['paper-cut collage', 'sculpture', 'installation'],
  'ballroom-waltz': ['three-beat', 'floor', 'rotation'],
  cartoon: ['cartoon', 'bold silhouettes', 'visual analogies'],
  'cel-dreamscape': ['environment-led', 'color-script', 'layered painted backgrounds'],
  cinema: ['storyboards', 'montage', 'match cuts'],
  classical: ['engraving', 'marginalia', 'archival plates'],
  'comic-flex': ['splash', 'gutters', 'diagram-comic'],
  'comic-panels': ['three-to-four-panel', 'turning', 'limited panel count'],
  'fairy-animation': ['character-led', 'expressive acting', 'story beats'],
  'fairy-tale': ['picture-book', 'page-turn', 'keepsake'],
  family: ['intergenerational', 'family maps', 'then-and-now'],
  festival: ['procession', 'program', 'gathering'],
  finance: ['value-flow', 'ledgers', 'risk-return'],
  'friendly-creature-team': ['creature', 'role-based', 'cooperation map'],
  'high-seas-adventure': ['nautical', 'ship cutaway', 'crew-role'],
  ink: ['ink wash', 'dry brush', 'negative space'],
  jungle: ['canopy', 'field discoveries', 'clearing'],
  'kinetic-editorial': ['oversized typography', 'diagonal', 'scale jumps'],
  light: ['shadow', 'reflected light', 'brightness'],
  magazine: ['cover', 'table of contents', 'pull quotes'],
  'mahjong-geometry': ['tile', 'adjacency', 'shared-center'],
  'midnight-jazz-vinyl': ['vinyl', 'liner-note', 'side a/side b'],
  'miniature-garden': ['tiny-scale', 'macro', 'garden map'],
  mountain: ['topographic', 'base camps', 'summit'],
  music: ['score-like', 'measures', 'harmony'],
  nature: ['botanical', 'roots-and-branches', 'natural cycle'],
  nostalgia: ['archive', 'contact sheets', 'then-and-now'],
  ocean: ['surface-to-seafloor', 'tide', 'current'],
  'original-magic-academy': ['academy', 'lesson', 'mastery'],
  'paper-craft-diorama': ['cutouts', 'folds', 'pop-up'],
  pixel: ['sprite', 'tile-built', 'parallax'],
  seasons: ['four-phase', 'weather', 'calendar'],
  'sky-islands': ['altitude', 'airships', 'docking stations'],
  spiritual: ['contemplative', 'thresholds', 'nonsectarian'],
  sports: ['coaching-board', 'drills', 'replay'],
  'stage-musical': ['overture', 'blocking', 'curtain-call'],
  stars: ['constellation', 'orbit', 'telescope'],
  street: ['stencil', 'wayfinding', 'mural'],
  tech: ['interface', 'data flows', 'prototype'],
  travel: ['waypoints', 'ticket', 'field notes'],
  'vintage-circus-poster': ['circus', 'ring diagrams', 'ticket motifs'],
  'wonder-science-sketch': ['observation', 'magnified', 'evidence']
};

// These groups contain themes that users or models are most likely to blur.
// A theme can appear in more than one group because collisions cross categories.
const collisionGroups = {
  'sequential illustration': ['comic-flex', 'comic-panels', 'cartoon'],
  'animated story worlds': ['fairy-animation', 'fairy-tale', 'cel-dreamscape', 'cinema'],
  'ecology and natural cycles': ['animals', 'nature', 'jungle', 'miniature-garden', 'seasons'],
  'mapped journeys': ['travel', 'mountain', 'ocean', 'jungle', 'sky-islands', 'high-seas-adventure'],
  'light and contemplation': ['light', 'stars', 'spiritual', 'ink'],
  'music and performance': ['music', 'stage-musical', 'ballroom-waltz', 'midnight-jazz-vinyl', 'festival', 'vintage-circus-poster'],
  'editorial and print': ['magazine', 'kinetic-editorial', 'street', 'classical', 'nostalgia'],
  'space and material': ['art', 'architecture', 'paper-craft-diorama'],
  'systems and diagrams': ['tech', 'finance', 'sports', 'wonder-science-sketch', 'mahjong-geometry', 'pixel'],
  'relationships and roles': ['family', 'animals', 'friendly-creature-team'],
  'imaginative learning': ['original-magic-academy', 'fairy-tale', 'wonder-science-sketch'],
  'celebration and spectacle': ['festival', 'stage-musical', 'vintage-circus-poster'],
  'digital worlds': ['pixel', 'tech', 'cel-dreamscape']
};

const byTheme = new Map();
for (const prompt of prompts) {
  const list = byTheme.get(prompt.themeId) || [];
  list.push(prompt);
  byTheme.set(prompt.themeId, list);
}

const expectedThemes = new Set(byTheme.keys());
const anchoredThemes = new Set(Object.keys(signatureAnchors));
for (const themeId of expectedThemes) {
  if (!anchoredThemes.has(themeId)) fail(`${themeId}: missing signature-anchor audit`);
}
for (const themeId of anchoredThemes) {
  if (!expectedThemes.has(themeId)) fail(`${themeId}: signature-anchor audit has no matching theme`);
}

const collisionCoverage = new Set(Object.values(collisionGroups).flat());
for (const themeId of expectedThemes) {
  if (!collisionCoverage.has(themeId)) fail(`${themeId}: missing collision-group audit`);
}
for (const [group, themes] of Object.entries(collisionGroups)) {
  if (new Set(themes).size !== themes.length) fail(`${group}: duplicate theme in collision group`);
  for (const themeId of themes) {
    if (!expectedThemes.has(themeId)) fail(`${group}: unknown theme ${themeId}`);
  }
}

const themeCore = new Map();
for (const [themeId, variants] of byTheme) {
  if (variants.length !== 3) fail(`${themeId}: expected 3 age variants, found ${variants.length}`);
  const extracted = variants.map(item => coreSections(item.prompt));
  for (const key of ['direction', 'identity', 'boundary', 'variety', 'avoid']) {
    if (extracted.some(value => !value[key])) fail(`${themeId}: missing ${key} section`);
  }
  for (const key of ['direction', 'identity', 'boundary', 'variety']) {
    if (new Set(extracted.map(value => value[key])).size !== 1) {
      fail(`${themeId}: ${key} must remain stable across age variants`);
    }
  }
  const core = `${extracted[0].direction} ${extracted[0].identity} ${extracted[0].boundary} ${extracted[0].variety} ${extracted[0].avoid}`.toLowerCase();
  themeCore.set(themeId, core);
  for (const anchor of signatureAnchors[themeId] || []) {
    if (!core.includes(anchor)) fail(`${themeId}: missing design anchor "${anchor}"`);
  }
}

const stopWords = new Set([
  'with', 'that', 'this', 'from', 'into', 'through', 'source', 'visual',
  'system', 'using', 'keep', 'while', 'rather', 'each', 'every', 'slide',
  'slides', 'theme', 'uploaded', 'factual', 'subject', 'same', 'avoid'
]);
const tokenize = value => new Set(value
  .replace(/[^a-z0-9-]+/g, ' ')
  .split(/\s+/)
  .filter(token => token.length > 3 && !stopWords.has(token)));
const jaccard = (left, right) => {
  const intersection = [...left].filter(token => right.has(token)).length;
  return intersection / (left.size + right.size - intersection);
};

const pairs = [];
const themeIds = [...themeCore.keys()].sort();
for (let left = 0; left < themeIds.length; left += 1) {
  for (let right = left + 1; right < themeIds.length; right += 1) {
    const a = themeIds[left];
    const b = themeIds[right];
    pairs.push({ a, b, score: jaccard(tokenize(themeCore.get(a)), tokenize(themeCore.get(b))) });
  }
}
pairs.sort((a, b) => b.score - a.score);
const maximumSimilarity = pairs[0]?.score || 0;
if (maximumSimilarity >= 0.41) {
  fail(`theme cores are too similar: ${pairs[0].a} / ${pairs[0].b} (${maximumSimilarity.toFixed(3)})`);
}

const sectionSets = {
  direction: new Set(),
  identity: new Set(),
  boundary: new Set(),
  variety: new Set()
};
for (const variants of byTheme.values()) {
  const sections = coreSections(variants[0].prompt);
  for (const key of Object.keys(sectionSets)) sectionSets[key].add(sections[key]);
}
for (const [key, values] of Object.entries(sectionSets)) {
  if (values.size !== expectedThemes.size) fail(`${key}: expected ${expectedThemes.size} unique theme sections, found ${values.size}`);
}

if (errors.length) {
  console.error(`Theme prompt audit failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`✓ ${expectedThemes.size} themes have audited medium/layout signature anchors`);
console.log(`✓ ${Object.keys(collisionGroups).length} collision groups cover all themes`);
console.log('✓ direction, identity, boundary, and slide-variety plans are unique and age-stable');
console.log(`✓ highest theme-core similarity is ${maximumSimilarity.toFixed(3)} (< 0.410): ${pairs[0].a} / ${pairs[0].b}`);
console.log('i closest theme pairs:');
for (const pair of pairs.slice(0, 8)) {
  console.log(`  ${pair.score.toFixed(3)}  ${pair.a} / ${pair.b}`);
}
