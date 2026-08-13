# Gemini Notebook Prompt Lab v1.2.1

This patch release hardens keyboard and focus accessibility without changing the project’s local-first architecture.

## Accessibility improvements

- Added standard keyboard navigation for the main tab interface:
  - Arrow Left / Right / Up / Down
  - Home / End
  - roving `tabIndex`
- Added explicit `aria-controls` relationships for tabs and panels.
- Added Prompt dialog `aria-modal`, `aria-labelledby`, and `aria-describedby` relationships.
- Prompt cards now remember the element that opened the dialog and restore keyboard focus after the dialog closes when possible.
- Dynamic favorite buttons expose `aria-pressed` and bilingual accessible labels.
- Added stronger `:focus-visible` styling for keyboard users.
- Added `prefers-reduced-motion: reduce` handling.
- Added `prefers-contrast: more` visual hardening.
- Added a documented manual accessibility checklist.
- Added automated static regression tests for the accessibility layer.

## Important scope note

This release does **not** claim full accessibility conformance. Cross-browser keyboard testing, screen-reader smoke tests, 200% zoom checks, and browser-tool contrast review remain tracked in Issue #4.

## Also included from v1.2.0

- shareable Prompt Library filter URLs;
- recent prompt history stored locally;
- JSON / Markdown / CSV export;
- reproducible 3 × 3 Showcase scaffold using one controlled source.

## Live app

https://dennis23100.github.io/gemini-notebook-prompt-lab/

## Showcase

https://dennis23100.github.io/gemini-notebook-prompt-lab/showcase.html

The project remains unaffiliated with Google. “Gemini Notebook” and “NotebookLM” are used only to describe compatibility.
