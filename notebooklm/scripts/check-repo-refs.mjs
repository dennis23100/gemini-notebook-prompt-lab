import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const repoRoot = resolve(projectRoot, '..');

const TEXT_EXTENSIONS = new Set([
  '.md', '.html', '.js', '.mjs', '.json', '.yml', '.yaml', '.xml', '.cff', '.txt', '.webmanifest'
]);

const FORBIDDEN = [
  'https://github.com/dennis23100/toolkit_60',
  'https://dennis23100.github.io/toolkit_60/',
  'dennis23100/toolkit_60'
];

// Historical migration notes may mention the former repository name intentionally.
const ALLOW_HISTORICAL = new Set([
  'notebooklm/CHANGELOG.md',
  'notebooklm/RELEASE_NOTES.md'
]);

const SKIP_DIRS = new Set(['.git', 'node_modules', 'generated-prompts']);

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) await walk(join(dir, entry.name), files);
      continue;
    }
    if (TEXT_EXTENSIONS.has(extname(entry.name)) || entry.name === 'LICENSE') {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

const failures = [];
for (const file of await walk(repoRoot)) {
  const rel = relative(repoRoot, file).replaceAll('\\', '/');
  if (ALLOW_HISTORICAL.has(rel)) continue;
  const text = await readFile(file, 'utf8');
  for (const needle of FORBIDDEN) {
    if (text.includes(needle)) failures.push(`${rel}: stale reference ${needle}`);
  }
}

if (failures.length) {
  console.error('Stale pre-rename repository references found:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Repository reference guard passed.');
