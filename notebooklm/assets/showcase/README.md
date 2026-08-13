# Showcase image assets

This folder is reserved for **real generated examples** produced from the controlled source in [`../../docs/showcase/SOURCE.md`](../../docs/showcase/SOURCE.md) and the exact Prompt IDs listed in [`../../docs/showcase/manifest.json`](../../docs/showcase/manifest.json).

Expected first milestone:

```text
comic-flex-children.webp
comic-flex-youth.webp
comic-flex-adult.webp
tech-children.webp
tech-youth.webp
tech-adult.webp
ink-children.webp
ink-youth.webp
ink-adult.webp
```

## Rules

- Do not place mockups here and describe them as Gemini Notebook output.
- Use the same documented source for all nine examples.
- Use the exact matching prompt variant for each slot.
- Crop only for presentation; do not materially alter the generated content.
- Remove personal/private information before committing screenshots.
- Prefer compressed WebP images and keep repository/page weight reasonable.
- Record generation date and any relevant Gemini Notebook settings in the PR or commit message.

If an image is missing, the public showcase page intentionally shows a reproducible placeholder with a link to the matching Prompt instead of pretending an output exists.
