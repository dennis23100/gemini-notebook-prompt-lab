import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const repoRoot = resolve(projectRoot, '..');

const read = path => readFile(resolve(repoRoot, path), 'utf8');

const [readme, readmeZh, preview, galleryCss, serviceWorker] = await Promise.all([
  read('README.md'),
  read('README.zh-TW.md'),
  read('notebooklm/docs/showcase-preview.svg'),
  read('notebooklm/assets/audience-gallery.css'),
  read('notebooklm/service-worker.js')
]);

test('repository READMEs use the crisp vector preview and label it honestly', () => {
  for (const [name, text] of [['README.md', readme], ['README.zh-TW.md', readmeZh]]) {
    assert.match(text, /notebooklm\/docs\/showcase-preview\.svg/, name);
    assert.doesNotMatch(text, /assets\/real-previews|sprite\.(?:jpe?g|webp)/i, name);
  }
  assert.match(readme, /illustrative style previews, not Gemini Notebook outputs/i);
  assert.match(readmeZh, /風格方向示意，不是 Gemini Notebook 的實際輸出/);
});

test('showcase preview is a scalable SVG with an explicit mockup disclosure', () => {
  assert.match(preview, /^<svg\b/);
  assert.match(preview, /viewBox="0 0 1500 980"/);
  assert.match(preview, /ILLUSTRATIVE MOCKUP · NOT GEMINI OUTPUT/);
});

test('prompt-card previews remain CSS-rendered at a 16:9 ratio', () => {
  assert.match(galleryCss, /aspect-ratio:\s*16\s*\/\s*9/);
  assert.doesNotMatch(galleryCss, /url\(|real-previews|sprite/i);
  assert.doesNotMatch(serviceWorker, /real-previews|sprite\.(?:jpe?g|webp)/i);
  assert.match(serviceWorker, /const CACHE='gnpl-v15'/);
});

test('obsolete encoded preview payloads and corrupt raster directory are absent', async () => {
  for (const path of [
    '.preview-b64',
    '.preview-sheet-v4',
    'notebooklm/assets/real-previews'
  ]) {
    const entries = await readdir(resolve(repoRoot, path)).catch(error => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
    assert.deepEqual(entries, [], path);
  }
});
