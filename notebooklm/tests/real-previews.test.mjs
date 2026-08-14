import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const files = [
  'assets/real-previews/comic-sprite.jpg',
  'assets/real-previews/stars-sprite.jpg',
  'assets/real-previews/fairy-animation-sprite.jpg'
];

function jpegSize(buffer) {
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (marker === 0xda) break;
    if (offset + 2 > buffer.length) break;
    const length = buffer.readUInt16BE(offset);
    if (length < 2 || offset + length > buffer.length) break;
    if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5)
      };
    }
    offset += length;
  }
  return null;
}

test('real preview JPEG sprites are complete, decodable-looking 3-panel images', async () => {
  for (const file of files) {
    const data = await readFile(new URL(`../${file}`, import.meta.url));
    assert.ok(data.length > 10_000, `${file} is unexpectedly small`);
    assert.equal(data[0], 0xff, `${file} missing JPEG SOI`);
    assert.equal(data[1], 0xd8, `${file} missing JPEG SOI`);
    assert.equal(data.at(-2), 0xff, `${file} missing JPEG EOI`);
    assert.equal(data.at(-1), 0xd9, `${file} missing JPEG EOI`);

    const size = jpegSize(data);
    assert.ok(size, `${file} has no readable JPEG dimensions`);
    assert.ok(size.width > size.height * 4.5, `${file} should contain three landscape panels`);
    assert.ok(size.width < size.height * 6.5, `${file} has an unexpected sprite aspect ratio`);
  }
});
