# Contributing

Thanks for improving Gemini Notebook Prompt Lab. The goal is not to maximize prompt count; it is to make prompts **more reusable, more source-grounded, easier to compare, and easier to trust**.

## Before you start

```bash
git clone https://github.com/dennis23100/toolkit_60.git
cd toolkit_60/notebooklm
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

Every contributed prompt should:

1. Say what artifact or task is being created.
2. Define its intended audience when audience matters.
3. Explicitly ground factual content in the selected/uploaded sources.
4. Tell the model what to do when the source does not contain an answer.
5. Separate **content instructions** from **style instructions**.
6. Avoid pretending a visual style itself is source content.
7. Avoid unsafe or manipulative instructions for children.
8. Avoid trademark-dependent style names when a generic description works.

Run `npm run validate` after editing `data/prompts.json` or `data/packs/*.json`.

## Data shape

Use the schema in `data/prompt-schema.json`. Each visual theme should normally have one `children`, one `youth`, and one `adults` entry with the same `themeId`.

## Pull requests

Keep PRs focused. In the description, explain:

- what problem you are solving;
- which prompts/workflows changed;
- how source grounding is preserved;
- which checks you ran;
- screenshots for meaningful UI changes.

By contributing, you agree that your code contribution may be distributed under MIT and your project-authored prompt/data contribution may be distributed under CC BY 4.0, unless the PR explicitly documents another compatible license.
