<div align="center">

# 🧠 Gemini Notebook Prompt Lab

**Age-adaptive, source-grounded prompt workflows for Gemini Notebook (formerly NotebookLM).**

[繁體中文](README.zh-TW.md) · [Open Gemini Notebook](https://notebook.google.com/) · [Back to Toolkit 60](../README.md)

![Prompts](https://img.shields.io/badge/prompts-90-5357e8)
![Themes](https://img.shields.io/badge/themes-30-13a37f)
![Workflows](https://img.shields.io/badge/workflows-10-7c82ff)
![Runtime](https://img.shields.io/badge/runtime_dependencies-0-success)

</div>

## What is this?

Gemini Notebook Prompt Lab is a browser-based toolkit for finding, composing, checking, and reusing prompts designed around **source-grounded Gemini Notebook workflows**.

It started from a practical teaching problem: the same source material should not be presented in exactly the same way to children, younger learners, and mature learners. The project turns that idea into a reusable open-source prompt system.

## 🚀 Quick access

### [Open Gemini Notebook →](https://notebook.google.com/)

The app is designed around a simple workflow:

1. Choose or build a prompt here.
2. Copy it.
3. Open Gemini Notebook in a new tab.
4. Paste it into the matching Studio or chat workflow.

> **Live Web App:** the Toolkit 60 GitHub Pages deployment will expose this project under `/notebooklm/` once Pages is enabled.

## ✨ Core features

### Prompt Library

Browse and search **90 age-adapted prompts** across **30 themes** and **3 audience profiles**.

### Same-theme age comparison

Compare how the same concept changes across:

| Audience | Design goal |
|---|---|
| Children | Warm, clear, playful, emotionally safe |
| Youth | Stylish, engaging, shareable, moderately deep |
| Adults | Mature, readable, steady, substantive |

### Prompt Lab

Compose reusable prompts for:

- Slide Deck
- Audio Overview
- Video Overview
- Infographic
- Quiz
- Flashcards
- Reports
- Data Tables
- Source-grounded Chat
- Mind Map companion workflows

### Prompt Chains

Build repeatable multi-step workflows such as:

1. **Extract** source-supported ideas.
2. **Transform** them into a teaching or presentation artifact.
3. **Verify** the result against the original sources.

### Local Prompt Linter

The linter uses transparent deterministic rules instead of calling another AI model. It checks for signals such as:

- source grounding
- anti-hallucination instructions
- audience definition
- clear task objective
- output format
- useful constraints
- specificity
- child-safe framing when relevant

### Privacy-first architecture

The project is designed as a static browser app:

- no backend required
- no API key required
- no analytics required
- custom data stays in browser storage unless the user exports it

## 📦 Planned project structure

```text
notebooklm/
├── README.md
├── README.zh-TW.md
├── index.html
├── assets/
├── data/
├── docs/
├── scripts/
├── tests/
├── service-worker.js
└── manifest.webmanifest
```

The full web app files will live inside this folder so the Toolkit 60 root stays clean and future tools can coexist without mixing codebases.

## 🧩 Why source grounding matters

Visual-style prompts can easily become ambiguous if they describe only appearance. A strong Gemini Notebook prompt should make it explicit that:

- the selected Notebook sources are the subject matter
- unsupported claims should not be invented
- the design instructions describe presentation style, not content
- missing information should be acknowledged rather than fabricated

This project makes those rules reusable and testable.

## 🌐 Language support

The first public version focuses on:

- English
- Traditional Chinese (`zh-TW`)

More languages can be added later without changing the core architecture.

## 🛠️ Development goals

The project intentionally stays lightweight and forkable. High-value next steps include:

- browser extension integration with Gemini Notebook
- validated community prompt packs
- prompt version / diff history
- accessibility checks
- optional sync that remains off by default
- more age-adaptive teaching workflows

## 🤝 Contributing

Useful contribution ideas include:

- improve one age adaptation
- propose a new theme across all audience groups
- improve a workflow recipe
- add or refine a linter rule
- improve accessibility or mobile UX
- add translations
- report Gemini Notebook UI changes that affect the workflow

## 📜 Licensing

Application code and prompt data will keep their licensing and attribution documented inside this project folder when the full source tree is published.

## ⭐ Support

If this project saves you time, star the parent **[Toolkit 60](../README.md)** repository. That one star follows the entire tool collection, including future creator tools.

---

<div align="center">

**Part of [Toolkit 60](../README.md)**

</div>
