<div align="center">

<img src="docs/hero.svg" alt="Gemini Notebook Prompt Lab" width="100%" />

# Gemini Notebook Prompt Lab

**An age-adaptive, source-grounded prompt library and workflow builder for Gemini Notebook (formerly NotebookLM).**

[繁體中文](README.zh-TW.md) · [🚀 Open Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/) · [Project home](../README.md) · [Contributing](CONTRIBUTING.md)

## 🚀 [Open Prompt Lab](https://dennis23100.github.io/gemini-notebook-prompt-lab/)

**Open the project itself first. From inside Prompt Lab, use the prominent 📓 Gemini Notebook button when you are ready to paste and generate.**

![Prompts](https://img.shields.io/badge/prompts-132-5357e8)
![Themes](https://img.shields.io/badge/themes-44-13a37f)
![Workflows](https://img.shields.io/badge/workflows-10-7c82ff)
![Dependencies](https://img.shields.io/badge/runtime_dependencies-0-success)
![License](https://img.shields.io/badge/code-MIT-blue)
![Prompt Data](https://img.shields.io/badge/prompt_data-CC_BY_4.0-orange)

</div>

> **Name update:** Google renamed NotebookLM to **Gemini Notebook** in July 2026. This project keeps “NotebookLM” in documentation and metadata for discoverability while using the current product name and `notebook.google.com` workflow.

## Why this project exists

Most prompt repositories stop at a long Markdown list. This project turns prompts into a small, forkable product:

- **132 age-adapted slide prompts** across 44 visual themes and 3 audience profiles.
- **Fourteen new original theme families** spanning dreamy animation, miniature adventure, sky exploration, stage performance, cultural geometry, and vivid mature editorial design.
- **Same-theme comparison** so educators can see how one concept changes for children, youth, and adults.
- **Prompt Lab** for Slide Deck, Audio Overview, Video Overview, Infographic, Quiz, Flashcards, Report, Data Table, source-grounded Chat, and Mind Map companion workflows.
- **Prompt Chain Builder** for repeatable multi-step workflows such as extract → create → verify.
- **Local Prompt Linter** with transparent rules for source grounding, anti-hallucination language, audience, task, format, and constraints.
- **Favorites, imports, exports, and custom prompts** stored locally in the browser.
- **One-click “Copy & Open Gemini Notebook”** that opens `https://notebook.google.com/` in a new tab.
- **PWA/offline support** with no account, backend, analytics, API key, or runtime dependency.

## Origin story

The first prompt pack was built for **age-adaptive teaching in a temple/community learning setting**. The practical problem was simple: the same source material should not be presented with the same wording, visual density, or emotional pacing to a child, a young adult, and a mature learner.

The repository generalizes that idea into a reusable open-source tool for educators, community teachers, trainers, researchers, and knowledge workers.

## Quick start

```bash
git clone https://github.com/dennis23100/gemini-notebook-prompt-lab.git
cd gemini-notebook-prompt-lab/notebooklm
npm run dev
```

Then open `http://localhost:4173`.

There are **no package dependencies**. The included Node development server only serves the static files.

You can also use Python:

```bash
python -m http.server 4173
```

## Deploy to GitHub Pages

The repository includes `.github/workflows/pages.yml`, which validates this app and publishes it as a Pages artifact.

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually).
5. Your site will be available at `https://<username>.github.io/<repo>/`.

All app paths are relative, so the site works correctly under a GitHub Pages project subdirectory.

## Features

### 1. Age-adaptive Prompt Library

Each of the 44 themes has three variants:

| Audience | Default profile | Design goal |
|---|---|---|
| Children | 15 and below | Warm, playful, clear, emotionally safe |
| Youth | 16–34 | Stylish, engaging, shareable, moderately deep |
| Adults | 35 and above | Readable, substantive, and calm or vivid according to the chosen theme |

The age ranges follow the original teaching pack and are intentionally configurable rather than treated as universal pedagogical rules.

### 2. Prompt Lab

Compose prompts by selecting:

- workflow/output type
- target audience
- focus topic
- visual theme (for slide decks)
- depth/difficulty
- role
- extra constraints
- strict source-grounding mode

The generated prompt can be copied, opened in Gemini Notebook, added to a chain, or sent to the local linter.

### 3. Prompt Chains

A chain is a sequence of editable prompts. A useful default pattern is:

1. **Extract** source-supported key ideas.
2. **Transform** them into a teaching artifact.
3. **Verify** the output against the source and identify unsupported claims.

Chains are saved to `localStorage` and can be copied as one reusable workflow.

### 4. Local Prompt Linter

The linter is deliberately deterministic. It does **not** call an AI model or pretend to know whether a prompt is objectively “good.” It checks for explicit, inspectable signals:

- source grounding
- anti-hallucination / missing-information behavior
- audience definition
- task objective
- output format
- constraints
- prompt specificity
- child-safe framing when relevant

This makes the score reproducible and easy to challenge or improve through pull requests.

### 5. Privacy-first static architecture

Everything runs in the browser:

```text
prompts.json manifest + data/packs/*.json ─┐
workflows.json ├─> vanilla JS app ─> localStorage / clipboard / downloads
user imports ─┘
```

No prompt text is sent to this project’s server because there is no application server.

## Current Gemini Notebook compatibility

The workflow list was reviewed against Google’s public Gemini Notebook / NotebookLM documentation in August 2026. Google currently documents Studio outputs including Audio Overviews, Video Overviews, Mind Maps, Reports, Data Tables, Flashcards/Quizzes, Slide Decks, and Infographics.

- Product overview: https://notebooklm.google/
- Help center: https://support.google.com/notebooklm
- Current app: https://notebook.google.com/

Because Google can change Studio UI and capabilities, this project treats workflow metadata as versioned data (`data/workflows.json`) rather than hard-coding assumptions throughout the UI.

## Project structure

```text
.
├── index.html
├── assets/
│   ├── app.js
│   ├── styles.css
│   └── favicon.svg
├── data/
│   ├── prompts.json
│   ├── packs/
│   ├── workflows.json
│   └── prompt-schema.json
├── scripts/
├── tests/
├── docs/
├── service-worker.js
├── manifest.webmanifest
├── README.md
├── README.zh-TW.md
├── AGENTS.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── LICENSE
├── LICENSE-DATA.md
└── THIRD_PARTY_NOTICES.md
```

## Data model

A prompt entry is intentionally simple. See [`data/prompt-schema.json`](data/prompt-schema.json) and run:

```bash
npm run validate
npm test
```

## Contributing

The easiest contributions are:

- improve one age adaptation without changing the source meaning
- add a new reusable visual theme across all three audiences
- improve a workflow recipe
- add a linter rule with a clear false-positive/false-negative rationale
- translate interface strings or prompt metadata
- improve accessibility or mobile UX

Read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a PR.

## Attribution and licensing

- **Application code:** MIT — see [LICENSE](LICENSE).
- **Project-authored prompt transformations and metadata:** CC BY 4.0 — see [LICENSE-DATA.md](LICENSE-DATA.md).
- Upstream inspirations and their licenses are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The project does not claim ownership over Google/Gemini/NotebookLM trademarks. “Gemini Notebook” and “NotebookLM” are used only to describe compatibility with Google’s product.

## Roadmap

See [ROADMAP.md](ROADMAP.md). High-value next steps include real generated examples, recent prompt history, accessibility improvements, more languages, and an optional low-permission browser extension.

## Launch & Star Growth

For the repository description, topics, social preview, contribution issues, and ethical launch plan, see [`docs/launch-and-growth.md`](docs/launch-and-growth.md).

## Star the project

If the project saves you time, a GitHub star helps other educators and prompt builders discover it. Better yet: fork it, add one useful prompt or workflow improvement, and open a PR.
