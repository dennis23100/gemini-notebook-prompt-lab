# Architecture

Gemini Notebook Prompt Lab is intentionally a **static, local-first web application**.

## Goals

1. Be deployable on GitHub Pages.
2. Require no API key, database, account, or runtime dependency.
3. Keep prompt data inspectable and contribution-friendly.
4. Make source-grounding rules explicit instead of hidden in model calls.
5. Work under a repository subpath such as `/toolkit_60/notebooklm/`.

## Runtime

```text
index.html
   │
   ├── assets/styles.css
   ├── assets/app.js
   │      ├── fetch data/prompts.json manifest → data/packs/*.json
   │      ├── fetch data/workflows.json
   │      ├── localStorage (favorites/custom prompts/chains)
   │      ├── Clipboard / Web Share / Downloads
   │      └── local deterministic linter
   │
   └── service-worker.js → caches the static app shell
```

No prompt content is sent to a project-controlled application server because there is no application server. The explicit external handoff is the user's action to open Gemini Notebook.

## Data

`data/prompts.json` is the prompt-pack manifest; the canonical built-in prompts live in `data/packs/*.json`. A visual theme uses a shared `themeId` across three age groups. `data/workflows.json` contains generic task recipes and placeholders. `data/prompt-schema.json` documents required prompt fields.

## UI modules

- **Library:** browse/search/filter/favorite/import/export.
- **Prompt detail dialog:** copy, share, compare age variants, add to chain.
- **Prompt Lab:** compose a task from workflow + audience + focus + constraints.
- **Chain Builder:** edit and reorder repeatable multi-step prompt sequences.
- **Quality Check:** transparent regex/heuristic checks; no model call.

## Trust boundaries

Imported/custom prompts are untrusted text. UI code must render them as text, never execute them. External links must not inherit opener privileges. Future integrations must remain opt-in and permission-minimal.

## Validation

`npm run validate` checks data integrity and project-safety invariants. `npm test` uses Node's built-in test runner for additional behavior/data assertions. GitHub Actions runs both on pushes and pull requests.

## Where to make changes

- UI behavior: `assets/app.js`
- Layout/theme: `assets/styles.css`
- Built-in prompt manifest: `data/prompts.json`
- Built-in prompt packs: `data/packs/*.json`
- Workflow recipes: `data/workflows.json`
- Validation policy: `scripts/validate-prompts.mjs` + tests
- End-user text: `index.html` and i18n strings in `assets/app.js`
