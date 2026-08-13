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

test('all static element ids referenced with $(#id) exist in index.html', () => {
  const htmlIds = new Set([...html.matchAll(/id=["']([^"']+)/g)].map((m) => m[1]));
  const usedIds = new Set([...app.matchAll(/\$\('#([^']+)'\)/g)].map((m) => m[1]));
  const missing = [...usedIds].filter((id) => !htmlIds.has(id));
  assert.deepEqual(missing, []);
});

test('social preview metadata is configured for the intended Pages URL', () => {
  assert.match(html, /og:image" content="https:\/\/dennis23100\.github\.io\/toolkit_60\/notebooklm\/docs\/social-preview\.png"/);
  assert.match(html, /og:image:width" content="1280"/);
  assert.match(html, /og:image:height" content="640"/);
});
