<div align="center">

<img src="notebooklm/docs/hero.svg" alt="Gemini Notebook Prompt Lab" width="100%" />

# 🧠 Gemini Notebook Prompt Lab

**A local-first, source-grounded prompt library and workflow toolkit for Gemini Notebook (formerly NotebookLM).**

[繁體中文](README.zh-TW.md) · [🚀 Open the live app](https://dennis23100.github.io/gemini-notebook-prompt-lab/) · [🖼️ Reproducible Showcase](https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html) · [Latest release](https://github.com/dennis23100/gemini-notebook-prompt-lab/releases/latest) · [Issues](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues)

![Prompts](https://img.shields.io/badge/prompts-90-665fe8)
![Themes](https://img.shields.io/badge/themes-30-15977f)
![Audiences](https://img.shields.io/badge/audiences-3-7a74f0)
![Workflows](https://img.shields.io/badge/workflows-10-5357e8)
![Tests](https://img.shields.io/badge/tests-automated-success)
![License](https://img.shields.io/badge/code-MIT-blue)

</div>

## See the difference in the live app

The live Prompt Library displays independently validated Gemini Notebook output examples for seven themes across Children, Youth, and Mature readers. The repository README intentionally stays text-first; open the app to browse the real previews at card size.

**Preview status:** real-output cards use original `1376 × 768` PNG exports, not sprite sheets, JPEG conversions, or enlarged thumbnails. Remaining cards are explicitly labeled CSS style previews.

| Audience | Default range | Presentation goal |
|---|---:|---|
| **Children** | ≤15 | clear, warm, memorable, lower density |
| **Youth** | 16–34 | energetic, relatable, moderate depth |
| **Mature readers** | 35+ | steady, substantive, highly readable |

The exact visual result can vary by source and generation run. Visual themes are directions, not rigid templates — for example, **Flexible Comic** can legitimately become manga-like, watercolor-like, cinematic, or another visual storytelling treatment when that better fits the source and audience.

The matching Prompt Library cards preserve the PNGs' native 16:9 geometry. The other cards use lightweight CSS style previews.

### 🚀 [Try the live Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/)

## The problem

Most prompt repositories are long text lists. This project started from a more practical question:

> **Should the same trusted source be presented in exactly the same way to a child, a young adult, and a mature reader?**

Gemini Notebook Prompt Lab keeps content grounded in the selected source while adapting wording, information density, pacing, and visual direction for the intended audience.

## What you can do

- **📚 Prompt Library** — 90 prompts = 30 visual themes × 3 audience profiles.
- **🧪 Prompt Lab** — compose prompts from workflow, audience, focus topic, visual theme, difficulty, role, and extra constraints.
- **🔗 Prompt Chains** — build repeatable extract → create → verify workflows.
- **✅ Quality Check** — deterministic local checks for source grounding, anti-invention language, audience, task, output format, and constraints.
- **⭐ Favorites / recent history / import / export** — stored locally in the browser.
- **🔗 Shareable filters** — library state can be represented in the URL.
- **📦 JSON / Markdown / CSV export** — export the current filtered result set.
- **📱 PWA / offline support** — no account or project backend required.

The Library defaults to **Children**, showing 30 prompts instead of mixing all 90 at once. Audience behaves like a radio selector and always has one active choice. Category/theme filters can be clicked again to clear them and return to all 30 themes for the selected audience.

## How it works

```text
1. Choose one audience + one visual theme
                 ↓
2. Copy the source-grounded prompt
                 ↓
3. Open Gemini Notebook in a new tab
                 ↓
4. Generate with your own trusted source material
```

The app has no project backend, account system, analytics SDK, database, or embedded API key.

## Real examples, style previews, and reproducible benchmark

The live Prompt Library contains 21 independently validated original PNG examples. The other card thumbnails remain fast CSS-rendered discovery aids and are explicitly labeled as style previews. This keeps real output distinct from illustrative direction while avoiding malformed, undersized, or stretched assets.

Separately, the project keeps a **reproducible Showcase** with a controlled project-authored source and exact prompt manifest, so contributors can compare genuine outputs without guessing the source or prompt:

### 🖼️ [Open the reproducible Showcase](https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html)

Mockups are never presented as generated output. A contributed real example must include provenance and pass PNG signature, decoding, dimension, and reference checks before it is used in the README or Prompt Library.

## Real-world teaching origin

The project is informed by real teaching experience, including an in-person teaching session with **100+ attendees**. That experience reinforced a simple idea: correct information matters, but presentation, pacing, and audience fit matter too.

<img src="notebooklm/docs/teaching-origin.svg" alt="Illustrated real-world teaching origin card" width="100%" />

The card above is a project-created illustration of the origin story, not a photograph. See [Project Story](docs/PROJECT_STORY.md).

## Open-source maintenance

This is an actively maintained public project.

- [Latest Release](https://github.com/dennis23100/gemini-notebook-prompt-lab/releases/latest)
- [Open Issues](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues)
- [`good first issue`](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [`help wanted`](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
- [Contributing](CONTRIBUTING.md)
- [Security](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

Before submitting code/data changes:

```bash
cd notebooklm
npm run check
```

## Current contribution opportunities

- cross-browser keyboard/accessibility testing;
- Japanese UI / metadata localization;
- additional real-output examples with clear provenance;
- Community Prompt Packs;
- focused prompt, documentation, and UX improvements.

## Attribution and licensing

- Repository/application code: **MIT**.
- Project-authored prompt transformations and metadata: see `notebooklm/LICENSE-DATA.md` and [LICENSING.md](LICENSING.md).
- Upstream inspirations and provenance: `notebooklm/THIRD_PARTY_NOTICES.md`.

This project is not affiliated with Google. “Gemini Notebook” and “NotebookLM” describe compatibility only.

---

<div align="center">

### 🚀 [Open Gemini Notebook Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/)

If the project is useful, try it, report a real issue, improve a prompt, submit a focused PR, or star it so more people can discover it.

</div>
