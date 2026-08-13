<div align="center">

<img src="notebooklm/docs/hero.svg" alt="Gemini Notebook Prompt Lab" width="100%" />

# 🧠 Gemini Notebook Prompt Lab

**A local-first, source-grounded prompt library and workflow toolkit for Gemini Notebook (formerly NotebookLM).**

[繁體中文](README.zh-TW.md) · [🚀 Open the live app](https://dennis23100.github.io/gemini-notebook-prompt-lab/) · [Latest release](https://github.com/dennis23100/gemini-notebook-prompt-lab/releases/latest) · [Issues](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues) · [Contributing](CONTRIBUTING.md)

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

Gemini Notebook Prompt Lab turns that problem into a reusable open-source workflow. It helps people choose or compose prompts that keep content grounded in the source while adapting tone, visual density, pacing, and presentation style to the intended audience.

## Real-world teaching origin

The project is informed by real teaching experience, including an in-person teaching session with **100+ attendees**. That experience reinforced a simple idea: good teaching is not only about having correct information; presentation, pacing, and audience fit matter too.

A privacy-reviewed teaching clip/still is being prepared for the public project story. It will be used as context for where the problem came from — **not** as a claim of 100+ GitHub users.

See [Project Story](docs/PROJECT_STORY.md).

## What you can do

### 📚 Prompt Library

Browse **90 age-adaptive prompts** across **30 visual themes** and **3 audience profiles**. Search, filter, favorite, compare age variants, copy, share, import, and export.

### 🧪 Prompt Lab

Compose a new source-grounded prompt from:

- Gemini Notebook workflow/output type;
- target audience;
- focus topic;
- visual theme;
- difficulty/depth;
- role;
- extra constraints;
- strict source-grounding rules.

### 🔗 Prompt Chains — advanced

Build repeatable multi-step flows such as:

```text
Extract → Create → Verify
```

### ✅ Quality Check — advanced

Run a deterministic local linter that checks for source grounding, anti-invention language, audience, task, output format, constraints, and specificity.

## How it works

```text
1. Choose a prompt or compose one
                 ↓
2. Copy it and open Gemini Notebook
                 ↓
3. Use it with your own trusted source material
```

The application itself does not upload your prompt text to a project server. There is no project backend, account system, analytics SDK, or embedded API key.

## Why the age variants matter

The project does not claim that one age range is universally correct for every teaching situation. The included profiles are configurable defaults from the original teaching workflow.

The important idea is the **comparison**:

| Same source | Children | Youth | Adults |
|---|---|---|---|
| Wording | shorter, familiar | engaging, moderate depth | mature, substantive |
| Visual density | low | medium | controlled / information-rich |
| Pacing | simple, guided | energetic | structured, deliberate |
| Tone | warm, safe | relatable | steady, credible |

## Visual examples

The live library now includes lightweight **illustrative style previews** for its themes. These previews communicate visual direction; they are **not guaranteed Gemini Notebook output**.

The next showcase milestone is deliberately small and evidence-focused: **3 representative themes × 3 audiences = 9 real generated examples**. That is enough to demonstrate the core age-adaptation idea without turning the repository into a gallery of 90 screenshots.

See [Showcase Plan](docs/SHOWCASE.md) and [Issue #6](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues/6).

## Current scope

- **90 prompts**
- **30 themes**
- **3 audience profiles**
- **10 Gemini Notebook workflows**
- Traditional Chinese + English UI
- local favorites / custom prompts / chains
- JSON import/export
- PWA/offline support
- source-grounding validation
- automated tests and GitHub Actions
- GitHub Pages live demo

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

Before submitting NotebookLM code/data changes, run:

```bash
cd notebooklm
npm run check
```

## Current contribution opportunities

Good places to help right now include:

- Markdown + CSV export;
- URL-shareable filters;
- keyboard/accessibility audit;
- Japanese UI/metadata localization;
- the first 9 real generated showcase examples.

Please use Issues rather than opening a large PR without context.

## Roadmap

The project is intentionally staying focused on Gemini Notebook / NotebookLM for now. High-value next steps are:

1. **real generated showcase examples** for selected themes and audiences;
2. **recently used prompts / local history**;
3. **simple vs advanced UI mode**;
4. better export and share workflows;
5. accessibility improvements;
6. additional languages;
7. an **optional browser extension** that reduces the Copy → Open → Paste friction while keeping permissions minimal.

Unrelated tools such as video-editing utilities will live in separate repositories if/when they are built.

## Repository structure

```text
.
├── README.md
├── README.zh-TW.md
├── CONTRIBUTING.md
├── MAINTAINERS.md
├── SECURITY.md
├── LICENSE
├── docs/
└── notebooklm/
    ├── index.html
    ├── assets/
    ├── data/
    ├── tests/
    ├── README.md
    ├── README.zh-TW.md
    ├── AGENTS.md
    └── ...
```

The application implementation currently remains inside `notebooklm/`; the repository homepage is the project overview.

## Attribution and licensing

- Repository / application code: **MIT**.
- Project-authored prompt transformations and metadata: see `notebooklm/LICENSE-DATA.md` and [LICENSING.md](LICENSING.md).
- Upstream inspirations and provenance are documented in `notebooklm/THIRD_PARTY_NOTICES.md`.

This project is not affiliated with Google. “Gemini Notebook” and “NotebookLM” are used only to describe product compatibility.

---

<div align="center">

### 🚀 [Open Gemini Notebook Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/)

If the project is useful, a GitHub star helps other educators, knowledge workers, and prompt builders discover it. Even better: use it, open an issue, improve a prompt, or submit a focused pull request.

</div>
