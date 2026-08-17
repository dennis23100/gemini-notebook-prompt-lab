import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const app = await readFile(resolve(root, 'assets/app.js'), 'utf8');

test('Gemini Notebook links open in a new tab without opener access', () => {
  assert.match(html, /href="https:\/\/notebook\.google\.com\/"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
  assert.match(app, /const NOTEBOOK_URL = 'https:\/\/notebook\.google\.com\/';/);
  assert.match(app, /window\.open\(NOTEBOOK_URL, '_blank', 'noopener,noreferrer'\)/);
});

test('static asset paths are project-subdirectory friendly', () => {
  assert.doesNotMatch(html, /(?:src|href)="\/(?!\/)/, 'root-absolute asset link found');
  assert.match(html, /src="\.\/assets\/app\.js"/);
  assert.match(app, /fetch\('\.\/data\/prompts\.json'\)/);
});

test('output language is independent from the interface language', () => {
  assert.match(html, /id="outputLanguageSelect"/);
  assert.match(html, /data-i18n="outputLanguageHint"/);
  assert.match(app, /OUTPUT_LANGUAGE_STORAGE_KEY/);
  assert.match(app, /promptForOutput/);
  assert.match(app, /#outputLanguageSelect/);
});

test('library discovery is paginated, collection-aware, and uses honest structure labels', () => {
  assert.match(html, /id="collectionFilters"/);
  assert.match(html, /id="loadMoreBtn"/);
  assert.match(app, /const PAGE_SIZE = 12/);
  assert.match(app, /state\.collection/);
  assert.match(app, /ruleComplete/);
  assert.doesNotMatch(app, /<span class="badge score-good">\$\{lint\.score\}\/100<\/span>/);
});

test('shareable collection filters are restored before the first library render', () => {
  assert.match(app, /function restoreSimpleFiltersFromUrl\(\)/);
  assert.match(app, /params\.get\('collection'\)/);
  assert.match(app, /restoreSimpleFiltersFromUrl\(\);\s*renderFilters\(\);/);
});

test('slide composer applies role, depth, and the non-overlapping youth range', () => {
  assert.match(app, /Role and delivery lens:/);
  assert.match(app, /Depth setting: advanced/);
  assert.match(app, /ages 16 to 34/);
  assert.doesNotMatch(app, /ages 16 to 35/);
});

test('all static element ids referenced with $(#id) exist in index.html', () => {
  const htmlIds = new Set([...html.matchAll(/id=["']([^"']+)/g)].map((m) => m[1]));
  const usedIds = new Set([...app.matchAll(/\$\('#([^']+)'\)/g)].map((m) => m[1]));
  const missing = [...usedIds].filter((id) => !htmlIds.has(id));
  assert.deepEqual(missing, []);
});

test('social preview metadata is configured for the canonical Pages root', () => {
  assert.match(html, /og:url" content="https:\/\/dennis23100\.github\.io\/gemini-notebook-prompt-lab\/"/);
  assert.match(html, /canonical" href="https:\/\/dennis23100\.github\.io\/gemini-notebook-prompt-lab\/"/);
  assert.match(html, /og:image" content="https:\/\/dennis23100\.github\.io\/gemini-notebook-prompt-lab\/docs\/social-preview\.png"/);
  assert.match(html, /og:image:width" content="1280"/);
  assert.match(html, /og:image:height" content="640"/);
});
