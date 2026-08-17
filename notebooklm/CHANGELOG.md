# Changelog

All notable changes to this project will be documented here.

## [1.3.0] - 2026-08-17

### Added

- 14 original visual themes across dreamy animation, miniature adventure, sky and sea exploration, magic-school notes, creature teams, paper craft, science sketching, musical theatre, waltz, mahjong geometry, jazz, circus, and kinetic editorial directions.
- 42 new age-adaptive prompts, bringing the library to 132 prompts across 44 themes and 3 audiences.
- Inspiration shortcuts for new, dreamy, animated, adventurous, child-friendly, vivid 35+, and real-output collections.
- Theme vibe, energy, collection, and optional real-output preview metadata with schema validation.
- Progressive card loading and URL-shareable collection filters.

### Changed

- Reworked every audience variant with an explicit audience art direction; youth now consistently covers ages 16–34.
- Mature-reader prompts keep substance and readability without defaulting every deck to calm, static, navy, sepia, or gold styling.
- Prompt Lab now applies role and depth controls to slide-deck generation and makes output-language priority explicit.
- Real-output previews use native lazy-loaded PNG images; illustrative previews are clearly labelled as such.
- The homepage is more compact and discovery-first, with the working area visible sooner.
- Structure scores are described as deterministic rule completeness, not a guarantee of generated-output quality.

### Safety

- New themes require original visual systems and explicitly prohibit copying or naming franchises, characters, studios, artists, or copyrighted universes.

### Validation

- Expanded automated validation and regression coverage to 30 checks.

## [1.2.1] - 2026-08-13

### Added

- Keyboard navigation for the primary tab interface with Arrow keys, Home, and End.
- Explicit tab/panel ARIA relationships and dialog labeling.
- Dialog focus restoration to the opening Prompt control.
- Bilingual accessible labels and pressed state for favorite controls.
- Strong `:focus-visible` keyboard focus styling.
- Reduced-motion and increased-contrast preference support.
- Accessibility checklist and static regression tests.

### Notes

- Manual cross-browser, zoom, contrast-tool, and screen-reader audit remains tracked in Issue #4; this release does not claim full accessibility conformance.

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
