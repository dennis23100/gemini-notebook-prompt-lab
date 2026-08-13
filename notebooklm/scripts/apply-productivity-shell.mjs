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
  if (!next.includes('./assets/productivity.css')) {
    next = next.replace(
      '<link rel="stylesheet" href="./assets/ui-polish.css" />',
      '<link rel="stylesheet" href="./assets/ui-polish.css" />\n  <link rel="stylesheet" href="./assets/productivity.css" />'
    );
  }
  if (!next.includes('./assets/productivity.js')) {
    next = next.replace(
      '<script type="module" src="./assets/ui-polish.js"></script>',
      '<script type="module" src="./assets/ui-polish.js"></script>\n  <script type="module" src="./assets/productivity.js"></script>'
    );
  }
  return next;
});

await patch('service-worker.js', sw => {
  let next = sw.replace(/const CACHE='gnpl-v\d+';/, "const CACHE='gnpl-v9';");
  if (!next.includes("'./assets/productivity.css'")) {
    next = next.replace(
      "'./assets/ui-polish.js',",
      "'./assets/ui-polish.js','./assets/productivity.css','./assets/productivity.js',"
    );
  }
  return next;
});

await patch('assets/app.js', app => app.replaceAll(
  'https://github.com/dennis23100/toolkit_60/tree/main/notebooklm',
  'https://github.com/dennis23100/gemini-notebook-prompt-lab'
));
