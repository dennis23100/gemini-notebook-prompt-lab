# Real Output Showcase

This folder turns the project’s showcase plan into a reproducible workflow.

The first milestone is intentionally small:

```text
3 visual themes × 3 audiences = 9 real examples
```

Selected themes:

1. **Flexible Comic**
2. **Technology**
3. **Ink Wash**

Selected audiences:

- Children
- Youth
- Adults

## Why nine instead of ninety?

The goal is to prove the project’s core idea, not to make a giant screenshot gallery. Nine examples are enough to answer the important question:

> How does the same trusted source change when the intended audience changes while the source facts stay fixed?

All nine examples should use the same project-authored demo source in [`source.md`](source.md) whenever possible.

## Generate the nine prompt files

From the repository root:

```bash
cd notebooklm
npm run showcase:export
```

The exporter scans the existing prompt packs, finds the three selected visual themes for all three audiences, and writes ready-to-copy Markdown files under:

```text
docs/showcase/generated-prompts/
```

It also writes a `cases.json` manifest with the actual prompt IDs found in the current data.

## Produce the real outputs

For each generated prompt:

1. Open the project-authored demo source in [`source.md`](source.md).
2. Add that source to Gemini Notebook.
3. Copy the matching exported prompt.
4. Generate the slide deck / presentation output.
5. Save one representative result image for the case.
6. Record the date and any relevant Gemini Notebook settings.
7. Do not manually redesign the output before capturing the example; the point is to show the workflow honestly.

## File naming

Use:

```text
<theme>-<audience>.<ext>
```

Examples:

```text
flexible-comic-children.webp
flexible-comic-youth.webp
flexible-comic-adults.webp
technology-children.webp
ink-wash-adults.webp
```

Preferred format: compressed WebP or AVIF when practical.

## Required caption

Every public example must be presented as an example, not a promise:

> Example output produced from the documented source + prompt workflow. Gemini Notebook output can vary by source, product version, settings, and generation run.

## Provenance

Each example should document:

- Prompt ID
- theme
- audience
- demo source version / commit
- generation date
- whether any crop was applied for presentation
- confirmation that the source and image may be redistributed

See [`SUBMISSION.md`](SUBMISSION.md) for the contribution checklist.

## What not to do

- Do not upload 90 screenshots just to make the repository look bigger.
- Do not call illustrative mockups “Gemini Notebook results.”
- Do not cherry-pick outputs and imply they are guaranteed.
- Do not use private teaching material, student data, faces, or copyrighted sources without permission.
- Do not change source facts between age variants.

## After the first nine are ready

Once the first set is complete, the website and README can add a compact comparison gallery:

```text
               Children       Youth          Adults
Flexible Comic    [ ]           [ ]            [ ]
Technology        [ ]           [ ]            [ ]
Ink Wash          [ ]           [ ]            [ ]
```

Only after that should we decide whether more themes meaningfully improve the project.