# Changelog

All notable changes to this project will be documented here.

## [1.2.0] - 2026-08-13

### Added

- URL-shareable Prompt Library filters for age, category, search, and favorites-only views.
- Recently used prompt history stored only in browser `localStorage`.
- JSON, Markdown, and CSV export for the current filtered prompt set.
- Reproducible 3 × 3 Showcase page with a controlled project-authored source and exact Prompt IDs.
- Showcase manifest and transparent placeholders for the first nine real generated-output slots.
- Automated static tests for the productivity layer.

### Changed

- Release automation now publishes only when `notebooklm/VERSION` changes, preventing release-note edits from publishing the wrong version.
- English and Traditional Chinese README documentation now reflects the shipped productivity and Showcase features.

## [1.1.2] - 2026-08-13

### Fixed

- Repository and GitHub Pages links after renaming the repository to `gemini-notebook-prompt-lab`.
- Canonical, Open Graph, sitemap, robots, in-app GitHub/Feedback, clone, and citation URLs.
- PWA cache migration after the repository rename.

## [1.1.0] - 2026-08-13

### Added

- Simple / advanced UI mode.
- Visible GitHub feedback entry and repository-level contribution/maintenance documents.
- Lightweight illustrative visual-theme previews.
- First 3 themes × 3 audiences Showcase plan.
- Real-world teaching origin documentation.

### Changed

- Repository scope focused on Gemini Notebook / NotebookLM only; unrelated future tools moved out of scope.
- GitHub Pages root now opens Prompt Lab directly.
- Redundant “All” filter pills are hidden from the UI.

## [1.0.0] - 2026-08-13

### Added

- 90 age-adaptive prompts across 30 themes and 3 audience profiles.
- Traditional Chinese / English interface.
- Prompt search, filters, favorites, import, export, and deep links.
- Same-theme age comparison.
- Prompt Lab with 10 Gemini Notebook workflows.
- Placeholder-based prompt composition.
- Prompt Chain Builder.
- Deterministic local Prompt Quality Linter.
- One-click copy and open `https://notebook.google.com/` in a new tab.
- PWA/offline shell.
- GitHub Pages deployment workflow and repository validation workflow.
- Contributor, security, licensing, provenance, architecture, and Codex guidance docs.
