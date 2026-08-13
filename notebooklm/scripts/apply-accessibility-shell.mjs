import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

async function patch(path, transform) {
  const absolute = resolve(root, path);
  const before = await readFile(absolute, 'utf8');
  const after = transform(before);
  if (after === before) return false;
  await writeFile(absolute, after, 'utf8');
  console.log(`updated ${path}`);
  return true;
}

await patch('index.html', html => {
  let next = html;
  if (!next.includes('./assets/accessibility.css')) {
    next = next.replace(
      '<link rel="stylesheet" href="./assets/productivity.css" />',
      '<link rel="stylesheet" href="./assets/productivity.css" />\n  <link rel="stylesheet" href="./assets/accessibility.css" />'
    );
  }
  if (!next.includes('./assets/accessibility.js')) {
    next = next.replace(
      '<script type="module" src="./assets/productivity.js"></script>',
      '<script type="module" src="./assets/productivity.js"></script>\n  <script type="module" src="./assets/accessibility.js"></script>'
    );
  }
  return next;
});

await patch('service-worker.js', sw => {
  let next = sw.replace(/const CACHE='gnpl-v\d+';/, "const CACHE='gnpl-v10';");
  if (!next.includes("'./assets/accessibility.css'")) {
    next = next.replace(
      "'./assets/productivity.js',",
      "'./assets/productivity.js','./assets/accessibility.css','./assets/accessibility.js',"
    );
  }
  return next;
});
