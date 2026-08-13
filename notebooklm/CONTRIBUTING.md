# Contributing

Thanks for improving Gemini Notebook Prompt Lab. The goal is not to maximize prompt count; it is to make prompts more reusable, more source-grounded, easier to compare, and easier to trust.

## Before you start

```bash
git clone https://github.com/dennis23100/gemini-notebook-prompt-lab.git
cd gemini-notebook-prompt-lab/notebooklm
npm run check
npm run dev
```

No package install is required. The project intentionally has zero runtime and development dependencies.

## Good first contributions

- Improve one age adaptation while preserving the source meaning.
- Add a theme only when you can provide all three audience variants.
- Improve a workflow recipe or placeholder design.
- Add a deterministic linter rule with tests.
- Improve keyboard, screen-reader, mobile, or contrast behavior.
- Translate UI strings or prompt metadata.
- Improve documentation with a reproducible example.

## Prompt rules

Every contributed prompt should define the task and intended audience when relevant, keep factual content grounded in selected sources, say what to do when information is missing, separate content from style instructions, and avoid treating visual style as source content.

Run `npm run validate` after editing `data/prompts.json` or `data/packs/*.json`.

## Data shape

Use the schema in `data/prompt-schema.json`. Each visual theme should normally have one `children`, one `youth`, and one `adult` entry with the same `themeId`.

## Pull requests

Keep PRs focused. Explain the problem being solved, what changed, how source grounding is preserved, which checks you ran, and include screenshots for meaningful UI changes.

By contributing, you agree that your code contribution may be distributed under MIT and your project-authored prompt/data contribution may be distributed under CC BY 4.0, unless the PR explicitly documents another compatible license.
