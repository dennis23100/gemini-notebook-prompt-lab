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

## The problem

Most prompt repositories are long lists. This project started from a more practical question:

> **Should the same trusted source be presented in exactly the same way to children, younger adults, and mature learners?**

Gemini Notebook Prompt Lab turns that problem into a reusable open-source workflow. It keeps content grounded in the source while adapting tone, information density, pacing, and presentation style to the intended audience.

## Real-world teaching origin

The project is informed by real teaching experience, including an in-person teaching session with **100+ attendees**. That experience reinforced a simple idea: correct information matters, but presentation, pacing, and audience fit matter too.

A privacy-reviewed teaching still/clip is planned for the public project story. It will be used as context for where the problem came from — **not** as a claim of 100+ GitHub users.

See [Project Story](docs/PROJECT_STORY.md).

## What you can do

### 📚 Prompt Library

Browse **90 age-adaptive prompts** across **30 visual themes** and **3 audience profiles**. Search, filter, favorite, compare age variants, copy, share, import, and export.

The library also includes:

- **shareable filter URLs** for age, category, search, and favorites-only views;
- **recently used prompts**, stored only in browser `localStorage`;
- **JSON, Markdown, and CSV export** of the current filtered result set;
- lightweight visual-direction previews for the 30 themes.

### 🧪 Prompt Lab

Compose a new source-grounded prompt from workflow/output type, audience, focus topic, visual theme, difficulty/depth, role, extra constraints, and strict grounding rules.

### 🔗 Prompt Chains — advanced

Build repeatable multi-step flows such as:

```text
Extract → Create → Verify
```

### ✅ Quality Check — advanced

Run a deterministic local linter for source grounding, anti-invention language, audience, task, output format, constraints, and specificity.

First-time users see a **simple mode** focused on Prompt Library + Prompt Lab. Advanced tools can be revealed when needed.

## How it works

```text
1. Choose a prompt or compose one
                 ↓
2. Copy it and open Gemini Notebook
                 ↓
3. Use it with your own trusted source material
```

The app has no project backend, account system, analytics SDK, database, or embedded API key.

## Why the age variants matter

The project does not claim that one age range is universally correct for every teaching situation. The included profiles are configurable defaults from the original teaching workflow. What matters is comparing how one trusted source can be presented for different audiences.

| Same source | Children | Youth | Adults |
|---|---|---|---|
| Wording | shorter, familiar | engaging, moderate depth | mature, substantive |
| Visual density | low | medium | controlled / information-rich |
| Pacing | simple, guided | energetic | structured, deliberate |
| Tone | warm, safe | relatable | steady, credible |

## Reproducible visual Showcase

The live library includes lightweight illustrative style previews, but those are **not guaranteed Gemini Notebook output**.

### 🖼️ [Open the 3 × 3 Showcase](https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html)

The first controlled experiment uses:

```text
1 controlled source
× 3 themes (Flexible Comic / Technology / Ink Wash)
× 3 audiences (Children / Youth / Adults)
= 9 reproducible output slots
```

Every slot links to the exact matching Prompt. A slot remains an explicit placeholder until an actual generated result is contributed; mockups are not labeled as Gemini Notebook output.

See [Showcase Plan](docs/SHOWCASE.md), the [controlled source](notebooklm/docs/showcase/SOURCE.md), and [Issue #6](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues/6).

## Current scope

- **90 prompts · 30 themes · 3 audiences · 10 workflows**
- Traditional Chinese + English UI
- simple / advanced UI modes
- local favorites / custom prompts / chains / recent history
- URL-shareable library filters
- JSON / Markdown / CSV export
- PWA/offline support
- source-grounding validation
- automated tests and GitHub Actions
- GitHub Pages live demo + reproducible Showcase

## Open-source maintenance

This is an actively maintained public project, not a one-time prompt dump.

- [Latest Release](https://github.com/dennis23100/gemini-notebook-prompt-lab/releases/latest)
- [Open Issues](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues)
- [`good first issue`](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [`help wanted`](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
- [Contributing](CONTRIBUTING.md)
- [Maintainers](MAINTAINERS.md)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Licensing](LICENSING.md)

Before submitting code/data changes:

```bash
cd notebooklm
npm run check
```

## Current contribution opportunities

- keyboard/accessibility audit;
- Japanese UI/metadata localization;
- the first 9 real generated Showcase examples;
- privacy-reviewed teaching-origin media;
- focused prompt or documentation improvements with clear provenance.

## Roadmap

1. fill the first nine real Showcase outputs;
2. add a privacy-reviewed teaching still / short clip;
3. accessibility improvements;
4. additional languages;
5. prompt/version comparison and contribution workflows;
6. optional low-permission browser extension.

Unrelated tools such as video-editing utilities will live in separate repositories if/when they are built.

## Attribution and licensing

- Repository/application code: **MIT**.
- Project-authored prompt transformations and metadata: see `notebooklm/LICENSE-DATA.md` and [LICENSING.md](LICENSING.md).
- Upstream inspirations and provenance: `notebooklm/THIRD_PARTY_NOTICES.md`.

This project is not affiliated with Google. “Gemini Notebook” and “NotebookLM” describe compatibility only.

---

<div align="center">

### 🚀 [Open Gemini Notebook Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/)

If the project is useful, use it, open an issue, improve a prompt, submit a focused PR, or star it so more people can discover it.

</div>
