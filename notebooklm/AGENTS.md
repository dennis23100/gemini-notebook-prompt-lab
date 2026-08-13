# AGENTS.md

This file is a short map for coding agents working on Gemini Notebook Prompt Lab. Keep it concise; deeper project context lives in `ARCHITECTURE.md`, `CONTRIBUTING.md`, and `docs/`.

## Project intent

Build a static, privacy-first, age-adaptive prompt library and workflow lab for Gemini Notebook (formerly NotebookLM). Preserve source grounding and make every important rule inspectable.

## First read

1. `ARCHITECTURE.md`
2. `CONTRIBUTING.md`
3. `README.md`
4. `data/prompt-schema.json` when editing prompt data

## Required checks

After any code or data change, run:

```bash
npm run check
```

For UI changes, also run:

```bash
npm run dev
```

and smoke-test the relevant path in a browser or with HTTP requests.

## Invariants

- Keep runtime dependencies at zero unless there is a compelling documented reason.
- Keep the app deployable as static files under a GitHub Pages project subpath.
- Do not add API keys, spreadsheet IDs, private Apps Script deployment URLs, secrets, or user data.
- Do not silently send prompts to analytics or third-party services.
- Built-in prompt facts must stay grounded in user-selected/uploaded sources.
- When the source lacks an answer, prompt instructions should tell the model not to invent one.
- Render imported/custom prompt content as text, not executable HTML.
- External new-tab links use `rel="noopener noreferrer"`.
- Maintain Traditional Chinese and English UI behavior.
- A built-in visual theme should normally have exactly three audience variants.

## Data edits

Do not hand-wave schema problems. Run the validator. Keep stable `id` and `themeId` values unless a migration is documented. Preserve provenance URLs and license notes.

## Style

Prefer plain browser APIs and readable JavaScript over framework abstractions. Favor small named functions, explicit state transitions, semantic HTML, keyboard accessibility, and CSS that works in both light and dark system themes.

## PR expectations

Summarize the user-visible change, list files/data affected, mention source-grounding implications, and report `npm run check` results. Include screenshots for meaningful UI changes.
