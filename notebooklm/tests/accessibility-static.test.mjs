import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const a11y = await readFile(resolve(root, 'assets/accessibility.js'), 'utf8');
const css = await readFile(resolve(root, 'assets/accessibility.css'), 'utf8');
const sw = await readFile(resolve(root, 'service-worker.js'), 'utf8');

test('accessibility layer is included in the application shell and PWA cache', () => {
  assert.match(html, /href="\.\/assets\/accessibility\.css"/);
  assert.match(html, /src="\.\/assets\/accessibility\.js"/);
  assert.match(sw, /\.\/assets\/accessibility\.css/);
  assert.match(sw, /\.\/assets\/accessibility\.js/);
});

test('tabs support standard arrow, Home, and End keyboard navigation', () => {
  for (const key of ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End']) {
    assert.match(a11y, new RegExp(key));
  }
  assert.match(a11y, /aria-controls/);
  assert.match(a11y, /tabIndex/);
});

test('dialog focus is restored to its opening control', () => {
  assert.match(a11y, /lastDialogTrigger/);
  assert.match(a11y, /addEventListener\('close'/);
  assert.match(a11y, /\.focus\(/);
  assert.match(a11y, /aria-modal/);
  assert.match(a11y, /aria-labelledby/);
});

test('keyboard focus and reduced-motion preferences have explicit styles', () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-contrast: more/);
});
