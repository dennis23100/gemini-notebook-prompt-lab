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
  ['children-stars', 'stars-children.png'],
  ['youth-stars', 'stars-youth.png'],
  ['adult-stars', 'stars-mature.png'],
  ['children-fairy-animation', 'fairy-animation-children.png'],
  ['youth-fairy-animation', 'fairy-animation-youth.png'],
  ['adult-fairy-animation', 'fairy-animation-mature.png']
];

const [readme, readmeZh, previewSvg, galleryCss, serviceWorker] = await Promise.all([
  read('README.md'),
  read('README.zh-TW.md'),
  read('notebooklm/docs/showcase-preview.svg'),
  read('notebooklm/assets/audience-gallery.css'),
  read('notebooklm/service-worker.js')
]);

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

test('all nine original PNG previews are complete, sharp, and unique', async () => {
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

test('READMEs, card CSS, and offline cache reference every independent PNG', () => {
  for (const [id, file] of previews) {
    const readmePath = `${previewRoot}/${file}`;
    assert.ok(readme.includes(readmePath), `README.md: ${file}`);
    assert.ok(readmeZh.includes(readmePath), `README.zh-TW.md: ${file}`);
    assert.ok(galleryCss.includes(`data-id="${id}"`), `audience-gallery.css: ${id}`);
    assert.ok(galleryCss.includes(`./real-previews/${file}`), `audience-gallery.css: ${file}`);
    assert.ok(serviceWorker.includes(`./assets/real-previews/${file}`), `service-worker.js: ${file}`);
  }

  assert.match(galleryCss, /aspect-ratio:\s*1376\s*\/\s*768/);
  assert.match(serviceWorker, /const CACHE='gnpl-v16'/);
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
