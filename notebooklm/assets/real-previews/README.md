# Real-output preview assets

These files are optimized website previews made from representative Gemini Notebook outputs supplied for the project.

## Mapping

Each WebP sprite contains three 16:9 slides in this order:

1. Children / 兒童 (≤15)
2. Youth / 青年 (16–34)
3. Mature readers / 成熟讀者 (35+)

Files:

- `comic-sprite.webp` — Flexible Comic / 漫畫（不拘）
- `stars-sprite.webp` — Stars / 星星
- `fairy-animation-sprite.webp` — Fairy-tale Animation / 童話動畫電影

The source slides are 1376 × 768. The sprites are optimized for prompt-card display, and CSS preserves the original 16:9 ratio so the artwork and text are not stretched.

`notebooklm/docs/real-output-gallery.webp` is the repository source for the README comparison board. The Pages deployment also generates a JPEG copy because GitHub's README image proxy can be inconsistent with WebP rendering.

These are representative examples, not deterministic promises: another generation run may produce a different visual treatment while following the same prompt direction.
