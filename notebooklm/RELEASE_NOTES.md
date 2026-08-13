# Gemini Notebook Prompt Lab v1.2.0

This release makes the Prompt Library more useful for real day-to-day workflows and adds a reproducible path toward honest generated-output examples.

## Productivity

- Added **shareable library filter URLs** for age, category, search, and favorites-only views.
- Added **recently used prompts**, stored only in browser `localStorage` with a clear-history action.
- Expanded export from JSON-only to **JSON, Markdown, and CSV**.
- Markdown export produces a readable prompt collection for documentation or sharing.
- CSV export is spreadsheet-friendly and safely quotes multiline prompt text.
- Export respects the current library filters instead of always exporting everything.

## Showcase

- Added a public reproducible Showcase page:
  https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html
- Added a project-authored CC BY 4.0 controlled source, **The Community Garden Plan**.
- Defined the first **3 themes × 3 audiences = 9** exact Prompt/output slots:
  - Flexible Comic × Children / Youth / Adults
  - Technology × Children / Youth / Adults
  - Ink Wash × Children / Youth / Adults
- Added a versioned Showcase manifest with exact Prompt IDs and expected image filenames.
- Missing real output images remain transparent placeholders with direct Prompt links; mockups are not presented as Gemini Notebook output.

## Maintenance and reliability

- Added automated tests for the productivity layer.
- Kept all new features dependency-free and local-first.
- Updated the in-app repository URL after the repository rename.
- Updated README documentation in English and Traditional Chinese to match the shipped functionality.
- Changed the release workflow so editing release notes alone can no longer accidentally publish the previous VERSION.

## Live app

https://dennis23100.github.io/gemini-notebook-prompt-lab/

## Reproducible Showcase

https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html

The project remains unaffiliated with Google. “Gemini Notebook” and “NotebookLM” are used only to describe compatibility.
