# Accessibility checklist

Gemini Notebook Prompt Lab aims to remain usable without a mouse and to preserve strong focus/contrast behavior in both light and dark themes.

## Implemented in the app

- Native buttons, links, form controls, and `<dialog>` are used for primary interactions.
- Tabs use `role="tablist"` / `role="tab"` and are synchronized with `aria-selected`, `aria-controls`, and roving `tabIndex`.
- Visible tabs support **Arrow Left / Right / Up / Down**, **Home**, and **End** keyboard navigation.
- Opening a Prompt from a card remembers the trigger; closing the dialog returns keyboard focus to that control when possible.
- The Prompt dialog exposes `aria-modal`, `aria-labelledby`, and `aria-describedby` relationships.
- Dynamic favorite controls expose `aria-pressed` and bilingual accessible labels.
- Strong `:focus-visible` outlines are defined independently of hover state.
- `prefers-reduced-motion: reduce` disables decorative motion/transitions.
- `prefers-contrast: more` strengthens component borders and secondary text.
- The page already includes a skip link to the main content.

## Manual audit still required

Automated/static checks cannot prove the entire interface is accessible. Before closing the accessibility tracking Issue, manually test at least:

- [ ] Chrome + keyboard only
- [ ] Firefox + keyboard only
- [ ] Safari or another WebKit browser where available
- [ ] Windows high-contrast / increased contrast behavior where available
- [ ] Screen reader smoke test (NVDA, VoiceOver, or equivalent)
- [ ] Prompt dialog open / close / Escape / focus return
- [ ] Simple ↔ advanced mode while navigating by keyboard
- [ ] Language switch while focus is inside interactive areas
- [ ] Mobile zoom to 200% and narrow viewport layout
- [ ] Color contrast with real browser accessibility tooling

## How to report a failure

Open an Issue and include:

- browser + version;
- operating system;
- input method or screen reader;
- exact control / workflow;
- expected behavior;
- observed behavior;
- screenshot or short recording when useful.

Tracking Issue: [#4](https://github.com/dennis23100/gemini-notebook-prompt-lab/issues/4)
