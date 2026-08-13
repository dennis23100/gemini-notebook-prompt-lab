# Launch & Star Growth Playbook

The project should earn stars because it solves a repeatable problem, not because people are pressured to star it.

## Repository launch

Recommended repository name:

```text
gemini-notebook-prompt-lab
```

Recommended description:

```text
Age-adaptive, source-grounded prompt library & workflow builder for Gemini Notebook (formerly NotebookLM). 90 prompts · 30 themes · 10 workflows · bilingual · privacy-first.
```

Recommended topics:

```text
gemini-notebook
notebooklm
prompt-engineering
prompts
education
teaching-tools
source-grounding
ai
pwa
github-pages
```

After the first push:

1. Set Pages source to **GitHub Actions**.
2. Wait for the `Deploy GitHub Pages` workflow to finish.
3. Put the live Pages URL in the repository **About** box.
4. Upload `docs/social-preview.png` as the repository social preview.
5. Create a `v1.0.0` release from the initial stable commit.
6. Pin the repository on the maintainer profile.

## Make the first 30 seconds strong

A visitor should immediately see:

- what problem the project solves;
- a live demo;
- the 90 / 30 / 3 / 10 scope numbers;
- one screenshot or short demo GIF;
- Copy → Open Gemini Notebook as the primary workflow;
- a clear reason to fork or contribute.

The README already covers most of this. Add a real UI screenshot/GIF after the Pages deployment is live.

## Create contribution surface area

Good open-source projects give people small, meaningful ways to participate. Suggested first issues:

- `good first issue: add Markdown + CSV export`
- `good first issue: add URL-addressable filters`
- `help wanted: accessibility keyboard audit`
- `help wanted: add Japanese UI metadata translation`
- `prompt: propose a new theme with 3 age variants`

Use the included issue forms so proposals include grounding and provenance instead of becoming a low-quality prompt dump.

## Share where the users already are

Good launch material is a **specific before/after use case**, not “please star my repo.” Examples:

- one source topic shown as children / youth / adult versions;
- a 20-second Copy → Open → Generate demo;
- a Prompt Lab example that composes Slide → Quiz → Verify;
- a short post about why prompt repositories need source-grounding tests.

When submitting the project to relevant awesome lists, newsletters, educator communities, or prompt-engineering communities, follow each community's contribution rules and disclose that you are the maintainer.

## Keep stars after launch

Stars tend to follow continued usefulness. Maintain a visible changelog, close obvious bugs quickly, label good first issues, merge external contributions carefully, and ship small releases with screenshots/examples. Avoid buying stars, star-for-star schemes, mass unsolicited promotion, or inflated claims.

## High-value future feature

An **optional browser extension** that inserts a selected prompt into an active Gemini Notebook panel could reduce friction further, but it should be a separate opt-in integration. Keep the static web app useful on its own and keep extension permissions minimal.
