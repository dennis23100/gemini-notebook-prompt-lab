# Generated Example Showcase

## Goal

Help a new visitor understand the project in under a minute by showing **real generated examples**, not only prompt text.

The first milestone is intentionally **9 examples**, not 90.

## First showcase matrix

Use the same safe, redistributable source topic for every example when possible so the audience differences are easier to compare.

| Theme | Children | Youth | Adults |
|---|---|---|---|
| Flexible Comic | ⬜ | ⬜ | ⬜ |
| Technology | ⬜ | ⬜ | ⬜ |
| Ink Wash | ⬜ | ⬜ | ⬜ |

This creates **3 themes × 3 audiences = 9 examples**.

## Why these three themes?

- **Flexible Comic** — makes age/pacing differences easy to see.
- **Technology** — demonstrates that the project is not only for playful teaching.
- **Ink Wash** — shows a very different visual language and mature presentation direction.

Together they communicate range without overwhelming the README.

## Required metadata for each example

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

If the source cannot be redistributed, do not commit it. Describe it at a high level instead.

## Labeling rule

Always distinguish:

- **Illustrative style preview** — our lightweight CSS preview of visual direction.
- **Generated example** — an actual output generated using the project prompt/workflow.

A generated example is still an example, **not a guarantee that another run will look identical**.

## File convention

Suggested structure:

```text
notebooklm/docs/showcase/
├── README.md
├── comic-flex/
│   ├── children.webp
│   ├── youth.webp
│   └── adult.webp
├── tech/
│   ├── children.webp
│   ├── youth.webp
│   └── adult.webp
└── ink/
    ├── children.webp
    ├── youth.webp
    └── adult.webp
```

Prefer WebP or another efficient web format. Keep full-resolution source images outside the repository when they are unnecessarily large.

## What not to do yet

Do not generate and commit all **30 × 3 = 90** images just to make the repository look bigger. Expand beyond the first nine only when:

- users ask for a specific theme;
- contributors provide useful, rights-cleared examples;
- the additional examples improve understanding rather than duplicate existing ones.

Tracking issue: [#6](https://github.com/dennis23100/toolkit_60/issues/6).
