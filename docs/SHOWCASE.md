# Generated Example Showcase

## Goal

Help a new visitor understand the project in under a minute by showing **real generated examples**, not only prompt text.

The first milestone is intentionally **9 examples**, not 90.

## Live reproducible showcase

The repository now includes a public showcase scaffold:

- Live page: `https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html`
- Controlled source: [`notebooklm/docs/showcase/SOURCE.md`](../notebooklm/docs/showcase/SOURCE.md)
- Example manifest: [`notebooklm/docs/showcase/manifest.json`](../notebooklm/docs/showcase/manifest.json)
- Image-slot rules: [`notebooklm/assets/showcase/README.md`](../notebooklm/assets/showcase/README.md)

Until a real output image exists, the live page shows a transparent placeholder and a link to the exact matching Prompt. It does **not** substitute a mockup and call it Gemini Notebook output.

## First showcase matrix

Every example uses the same project-authored, redistributable fictional source, **The Community Garden Plan**, so audience and visual-theme differences are easier to compare.

| Theme | Children | Youth | Adults |
|---|---|---|---|
| Flexible Comic | ⬜ | ⬜ | ⬜ |
| Technology | ⬜ | ⬜ | ⬜ |
| Ink Wash | ⬜ | ⬜ | ⬜ |

This creates **3 themes × 3 audiences = 9 examples**.

Exact Prompt IDs are versioned in `notebooklm/docs/showcase/manifest.json`.

## Why these three themes?

- **Flexible Comic** — makes age/pacing differences easy to see.
- **Technology** — demonstrates that the project is not only for playful teaching.
- **Ink Wash** — shows a very different visual language and mature presentation direction.

Together they communicate range without overwhelming the README.

## Required metadata for each real example

Every real generated example should record:

```text
Prompt ID:
Theme:
Audience:
Source title / source type:
Generated with:
Generation date:
Manual edits after generation: yes/no + notes
```

For the first nine examples, the source must be the controlled source above unless the showcase plan is intentionally revised and documented.

## Labeling rule

Always distinguish:

- **Illustrative style preview** — our lightweight CSS preview of visual direction.
- **Generated example** — an actual output generated using the project prompt/workflow.

A generated example is still an example, **not a guarantee that another run will look identical**.

## File convention

The first milestone uses this flat, predictable structure:

```text
notebooklm/assets/showcase/
├── comic-flex-children.webp
├── comic-flex-youth.webp
├── comic-flex-adult.webp
├── tech-children.webp
├── tech-youth.webp
├── tech-adult.webp
├── ink-children.webp
├── ink-youth.webp
└── ink-adult.webp
```

Prefer WebP. Keep full-resolution source images outside the repository when they are unnecessarily large.

## What not to do yet

Do not generate and commit all **30 × 3 = 90** images just to make the repository look bigger. Expand beyond the first nine only when:

- users ask for a specific theme;
- contributors provide useful, rights-cleared examples;
- the additional examples improve understanding rather than duplicate existing ones.

Tracking issue: [#6](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues/6).
