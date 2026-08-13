# Showcase runbook

This folder contains the reproducible first Showcase experiment for Gemini Notebook Prompt Lab.

## Fixed experiment

Use the same source for all nine runs:

- [`SOURCE.md`](SOURCE.md) — **The Community Garden Plan**

Use the exact Prompt IDs and output filenames in:

- [`manifest.json`](manifest.json)

Public page:

- `https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html`

## Run procedure

For each of the nine manifest entries:

1. Open the controlled `SOURCE.md` and add that content as the source in Gemini Notebook.
2. Open the corresponding Prompt from the Showcase page.
3. Use the Prompt with the controlled source.
4. Generate the requested slide/presentation output.
5. Capture a representative result without adding unrelated manual content.
6. Crop only as needed for presentation and privacy.
7. Save as WebP using the exact filename from `manifest.json`.
8. Put the image under `notebooklm/assets/showcase/`.
9. Record the generation date and any manual edits in the commit/PR.

## Do not cherry-pick silently

Generative output varies. If you retry a run, record that fact when contributing the example. The goal is to show a useful, reproducible workflow — not to imply that one hand-picked screenshot is guaranteed output.

## Completion definition

The milestone is complete when all nine expected image files exist, are rights-cleared/privacy-reviewed, and were actually generated with the documented source + matching Prompt.
