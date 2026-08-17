# Real-output preview assets

These files are the original PNG exports supplied by the project maintainer on 2026-08-17. They are representative Gemini Notebook outputs, not mockups.

## Mapping

| Theme | Children / 兒童 (≤15) | Youth / 青年 (16–34) | Mature readers / 成熟讀者 (35+) |
|---|---|---|---|
| Flexible Comic / 漫畫（不拘） | `comic-children.png` | `comic-youth.png` | `comic-mature.png` |
| Stars / 星星 | `stars-children.png` | `stars-youth.png` | `stars-mature.png` |
| Fairy-tale Animation / 童話動畫電影 | `fairy-animation-children.png` | `fairy-animation-youth.png` | `fairy-animation-mature.png` |

Every image is an independent 1376 × 768, 24-bit RGB PNG. The site loads one file per matching card and preserves the original aspect ratio. The README also references the individual files directly. No sprite sheet, JPEG conversion, cropping, or raster upscaling is used.

The automated preview-asset test validates the PNG signature and structure, decompresses the image data, checks the dimensions, and verifies every README, CSS, and service-worker reference.

These are representative examples rather than deterministic promises: another generation run can produce a different visual treatment while following the same prompt direction.
