import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const sw = await readFile(resolve(root, 'service-worker.js'), 'utf8');
const productivity = await readFile(resolve(root, 'assets/productivity.js'), 'utf8');

test('productivity layer is loaded by the app shell', () => {
  assert.match(html, /href="\.\/assets\/productivity\.css"/);
  assert.match(html, /src="\.\/assets\/productivity\.js"/);
  assert.match(sw, /\.\/assets\/productivity\.css/);
  assert.match(sw, /\.\/assets\/productivity\.js/);
  assert.match(sw, /\.\/assets\/prompt-language\.js/);
});

test('shareable filter state uses URL query parameters', () => {
  for (const key of ['age', 'category', 'q', 'favorites']) {
    assert.match(productivity, new RegExp(`searchParams\\.(?:set|get)\\('${key}'`));
  }
});

test('enhanced export supports JSON, Markdown, and CSV', () => {
  assert.match(productivity, /data-export-format="json"/);
  assert.match(productivity, /data-export-format="md"/);
  assert.match(productivity, /data-export-format="csv"/);
  assert.match(productivity, /markdownExportProductivity/);
  assert.match(productivity, /csvExportProductivity/);
  assert.match(productivity, /exportedPromptTextProductivity/);
});

test('recent prompt history stays local to the browser', () => {
  assert.match(productivity, /gnpl\.recentPrompts/);
  assert.match(productivity, /localStorage\.setItem\(RECENT_KEY/);
  assert.doesNotMatch(productivity, /fetch\([^)]*recent/i);
});
