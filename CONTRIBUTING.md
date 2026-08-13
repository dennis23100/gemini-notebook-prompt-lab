# Contributing to Toolkit 60

Thanks for helping improve Toolkit 60. This repository is a monorepo: each major tool lives in its own folder and may have more specific contribution guidance.

## Start with an issue

For non-trivial changes, please check the existing Issues first. If your idea is not already tracked, open an issue describing the problem, intended users, and the smallest useful outcome before investing in a large implementation.

Good places to start are issues labeled `good first issue` or `help wanted`.

## Current projects

- `notebooklm/` — Gemini Notebook Prompt Lab. Read [`notebooklm/CONTRIBUTING.md`](notebooklm/CONTRIBUTING.md) before changing prompt data, localization, UI behavior, or validation rules.
- `video-editing/` — planned project; scope is still being defined.

## Pull request expectations

A useful PR should:

1. Solve one clearly described problem.
2. Keep unrelated refactors out of the same change when possible.
3. Update documentation when behavior changes.
4. Add or update tests for logic that can be tested deterministically.
5. Preserve privacy-first / local-first behavior unless a proposal explicitly discusses a change.
6. Avoid introducing dependencies without a clear reason and tradeoff discussion.
7. Respect the licensing and provenance rules in the affected subproject.

For NotebookLM changes, run:

```bash
cd notebooklm
npm run check
```

before opening a PR.

## Prompt and content contributions

Prompt contributions must preserve source-grounding behavior and should not silently add claims, doctrines, facts, or examples that are unsupported by the source. Keep provenance information when adapting work inspired by external repositories.

Prompt/data licensing can differ from code licensing; see [`LICENSING.md`](LICENSING.md) and the subproject license files.

## Reviews and maintenance

Maintainers may ask for smaller scope, tests, clearer reproduction steps, accessibility fixes, licensing clarification, or revisions before merging. Constructive disagreement is welcome; please focus criticism on the work rather than the contributor.

By contributing, you agree to follow the repository [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).
