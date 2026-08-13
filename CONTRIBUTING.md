# Contributing to Gemini Notebook Prompt Lab

Thanks for helping improve the project. The repository is currently focused on the **Gemini Notebook / NotebookLM Prompt Lab**; unrelated future tools should use separate repositories.

## Start with an issue

For non-trivial changes, check the existing Issues first. If your idea is not already tracked, open an issue describing:

1. the problem;
2. who is affected;
3. the smallest useful outcome;
4. any UX, privacy, compatibility, or licensing tradeoffs.

Good places to start are issues labeled [`good first issue`](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) or [`help wanted`](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).

## Before opening a PR

Run:

```bash
cd notebooklm
npm run check
```

A useful PR should:

1. solve one clearly described problem;
2. keep unrelated refactors out of the same change when possible;
3. update documentation when behavior changes;
4. add or update tests for deterministic logic;
5. preserve local-first / privacy-first behavior unless the proposal explicitly discusses a change;
6. avoid dependencies without a clear reason and tradeoff discussion;
7. preserve accessibility in both light and dark themes;
8. keep Traditional Chinese / English UI behavior coherent;
9. respect licensing and provenance.

## Prompt contributions

Prompt changes must preserve source-grounding behavior. Do not silently add claims, doctrines, facts, quotations, or examples unsupported by the source.

A new visual theme should normally include all required audience variants and the same validation expectations as existing built-in prompts.

Keep provenance information when adapting work inspired by external repositories.

## Generated showcase contributions

Real output examples are welcome, but they must:

- identify the Prompt ID, theme, audience, and generation context;
- be labeled as examples, not guaranteed output;
- use source material the contributor has the right to share, or omit the source itself when redistribution is not allowed;
- disclose meaningful manual edits after generation;
- avoid exposing private information or identifiable people without appropriate permission.

See [`docs/SHOWCASE.md`](docs/SHOWCASE.md).

## Review and maintenance

Maintainers may ask for smaller scope, tests, clearer reproduction steps, accessibility fixes, licensing clarification, or revisions before merging.

Constructive disagreement is welcome. Critique the work rather than the contributor.

By contributing, you agree to follow [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
