# Reliability roadmap

The next maintenance milestone focuses on browser-level interaction reliability before adding new product features.

## Must-pass interactions

- Prompt Lab workflow, audience, visual-theme, difficulty, and role controls can be changed and dismissed normally.
- Light / dark theme switching works and persists after reload.
- Traditional Chinese / English switching remains responsive.
- Prompt generation remains responsive after changing form controls.
- Library and Prompt Lab tabs can be switched repeatedly without a DOM update loop.

## Browser matrix

The target browser matrix is Chromium, Firefox, and WebKit/Safari. Automated browser tests should supplement—not replace—the manual accessibility checks tracked in Issue #4.

## Regression history

Two regressions were reported during the v1.2.x cycle: native select menus becoming difficult to use because of repeated DOM/compositor activity, and theme switching not responding consistently. PR #9 and PR #10 are part of the maintenance trail for these reports.

## Release gate

Do not call v1.2.2 complete until the user-facing controls above have been re-tested on the deployed GitHub Pages build and the repository has a repeatable cross-browser test path.
