import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { inflateSync } from 'node:zlib';

const projectRoot = resolve(import.meta.dirname, '..');
const repoRoot = resolve(projectRoot, '..');

const read = path => readFile(resolve(repoRoot, path), 'utf8');
const previewRoot = 'notebooklm/assets/real-previews';
const previews = [
  ['children-comic-flex', 'comic-children.png'],
  ['youth-comic-flex', 'comic-youth.png'],
  ['adult-comic-flex', 'comic-mature.png'],
  ['children-comic-panels', 'comic-panels-children.png'],
  ['youth-comic-panels', 'comic-panels-youth.png'],
  ['adult-comic-panels', 'comic-panels-mature.png'],
  ['children-cartoon', 'cartoon-children.png'],
  ['youth-cartoon', 'cartoon-youth.png'],
  ['adult-cartoon', 'cartoon-mature.png'],
  ['children-fairy-tale', 'fairy-tale-children.png'],
  ['youth-fairy-tale', 'fairy-tale-youth.png'],
  ['adult-fairy-tale', 'fairy-tale-mature.png'],
  ['children-animals', 'animals-children.png'],
  ['youth-animals', 'animals-youth.png'],
  ['adult-animals', 'animals-mature.png'],
  ['children-stars', 'stars-children.png'],
  ['youth-stars', 'stars-youth.png'],
  ['adult-stars', 'stars-mature.png'],
  ['children-fairy-animation', 'fairy-animation-children.png'],
  ['youth-fairy-animation', 'fairy-animation-youth.png'],
  ['adult-fairy-animation', 'fairy-animation-mature.png'],
  ['children-mountain', 'mountain-children.png'],
  ['youth-mountain', 'mountain-youth.png'],
  ['adult-mountain', 'mountain-mature.png'],
  ['youth-nature', 'nature-youth.png'],
  ['youth-ocean', 'ocean-youth.png'],
  ['youth-jungle', 'jungle-youth.png'],
  ['children-jungle', 'jungle-children.png'],
  ['children-nature', 'nature-children.png'],
  ['children-ocean', 'ocean-children.png'],
  ['children-seasons', 'seasons-children.png'],
  ['youth-seasons', 'seasons-youth.png'],
  ['adult-nature', 'nature-mature.png'],
  ['adult-ocean', 'ocean-mature.png'],
  ['adult-jungle', 'jungle-mature.png'],
  ['adult-seasons', 'seasons-mature.png']
];

const [readme, readmeZh, appReadme, appReadmeZh, previewSvg, galleryCss, uiPolishCss, serviceWorker, appJs, promptManifest] = await Promise.all([
  read('README.md'),
  read('README.zh-TW.md'),
  read('notebooklm/README.md'),
  read('notebooklm/README.zh-TW.md'),
  read('notebooklm/docs/showcase-preview.svg'),
  read('notebooklm/assets/audience-gallery.css'),
  read('notebooklm/assets/ui-polish.css'),
  read('notebooklm/service-worker.js'),
  read('notebooklm/assets/app.js'),
  read('notebooklm/data/prompts.json').then(JSON.parse)
]);
const promptPacks = await Promise.all(promptManifest.packs.map(pack => read(`notebooklm/${pack.path.replace(/^\.\//, '')}`).then(JSON.parse)));
const builtInPrompts = promptPacks.flatMap(pack => pack.prompts || []);

function inspectPng(buffer, name) {
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  assert.deepEqual([...buffer.subarray(0, 8)], signature, `${name}: PNG signature`);

  let offset = 8;
  let ihdr;
  let sawIend = false;
  const idat = [];

  while (offset < buffer.length) {
    assert.ok(offset + 12 <= buffer.length, `${name}: complete chunk header`);
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + length;
    const chunkEnd = dataEnd + 4;
    assert.ok(chunkEnd <= buffer.length, `${name}: complete ${type} chunk`);

    const data = buffer.subarray(dataStart, dataEnd);
    if (type === 'IHDR') ihdr = data;
    if (type === 'IDAT') idat.push(data);

    offset = chunkEnd;
    if (type === 'IEND') {
      sawIend = true;
      break;
    }
  }

  assert.ok(ihdr, `${name}: IHDR chunk`);
  assert.ok(idat.length > 0, `${name}: IDAT data`);
  assert.ok(sawIend, `${name}: IEND chunk`);
  assert.equal(offset, buffer.length, `${name}: no truncated or trailing data`);

  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const bitDepth = ihdr[8];
  const colorType = ihdr[9];
  const compression = ihdr[10];
  const filter = ihdr[11];
  const interlace = ihdr[12];
  const channels = new Map([[0, 1], [2, 3], [3, 1], [4, 2], [6, 4]]).get(colorType);

  assert.ok(channels, `${name}: supported PNG color type`);
  assert.equal(compression, 0, `${name}: standard compression`);
  assert.equal(filter, 0, `${name}: standard filtering`);
  assert.equal(interlace, 0, `${name}: non-interlaced preview`);

  const bytesPerRow = Math.ceil(width * channels * bitDepth / 8) + 1;
  const pixels = inflateSync(Buffer.concat(idat));
  assert.equal(pixels.length, bytesPerRow * height, `${name}: complete pixel data`);

  return { width, height, bitDepth, colorType };
}

test('all thirty-six original PNG previews are complete, sharp, and unique', async () => {
  const hashes = new Set();

  for (const [, file] of previews) {
    const buffer = await readFile(resolve(repoRoot, previewRoot, file));
    const metadata = inspectPng(buffer, file);
    assert.deepEqual(
      { width: metadata.width, height: metadata.height, bitDepth: metadata.bitDepth },
      { width: 1376, height: 768, bitDepth: 8 },
      file
    );
    assert.ok(buffer.length > 1_000_000, `${file}: original export, not a tiny thumbnail`);
    hashes.add(createHash('sha256').update(buffer).digest('hex'));
  }

  assert.equal(hashes.size, previews.length, 'every audience/theme preview is distinct');
});

test('README stays text-first while prompt metadata lazy-loads every independent PNG', () => {
  assert.doesNotMatch(readme, /notebooklm\/assets\/real-previews\//);
  assert.doesNotMatch(readmeZh, /notebooklm\/assets\/real-previews\//);
  assert.doesNotMatch(`${readme}\n${readmeZh}\n${appReadme}\n${appReadmeZh}`, /<img\s+src="[^\"]+\.(?:svg|png|jpe?g|webp)"/i);

  for (const [id, file] of previews) {
    const prompt = builtInPrompts.find(item => item.id === id);
    assert.equal(prompt?.preview?.kind, 'real-output', `${id}: preview kind`);
    assert.equal(prompt?.preview?.src, `./assets/real-previews/${file}`, `${id}: preview source`);
    assert.ok(!serviceWorker.includes(`./assets/real-previews/${file}`), `${file}: not install-preloaded`);
  }

  assert.match(galleryCss, /aspect-ratio:\s*1376\s*\/\s*768/);
  assert.match(galleryCss, /\.prompt-card::before/);
  assert.match(galleryCss, /\.prompt-card::after/);
  assert.doesNotMatch(uiPolishCss, /style-previews\.css/);
  assert.doesNotMatch(serviceWorker, /style-previews\.css/);
  assert.match(appJs, /loading="lazy"/);
  assert.match(appJs, /decoding="async"/);
  assert.match(appJs, /fetchpriority="low"/);
  assert.match(serviceWorker, /const CACHE='gnpl-v20'/);
  assert.doesNotMatch(`${readme}\n${readmeZh}\n${galleryCss}`, /real-previews\/[\w-]*sprite\.(?:png|jpe?g|webp)/i);
});

test('illustrative showcase board remains scalable and explicitly disclosed', () => {
  assert.match(previewSvg, /^<svg\b/);
  assert.match(previewSvg, /viewBox="0 0 1500 980"/);
  assert.match(previewSvg, /ILLUSTRATIVE MOCKUP · NOT GEMINI OUTPUT/);
});

test('obsolete encoded payloads stay absent and the preview directory is exact', async () => {
  for (const path of ['.preview-b64', '.preview-sheet-v4']) {
    const entries = await readdir(resolve(repoRoot, path)).catch(error => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
    assert.deepEqual(entries, [], path);
  }

  const entries = (await readdir(resolve(repoRoot, previewRoot))).sort();
  const expected = ['README.md', ...previews.map(([, file]) => file)].sort();
  assert.deepEqual(entries, expected, previewRoot);
});
