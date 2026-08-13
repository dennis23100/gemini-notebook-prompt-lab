# Deployment

Gemini Notebook Prompt Lab is published as part of the **Toolkit 60** GitHub Pages site.

## Live URLs

- Toolkit 60: https://dennis23100.github.io/toolkit_60/
- Prompt Lab: https://dennis23100.github.io/toolkit_60/notebooklm/

## Deployment model

The repository-level workflow at `../.github/workflows/pages.yml` validates the NotebookLM subproject, builds a small Toolkit 60 landing page, copies this project to `/notebooklm/`, and deploys the resulting artifact with GitHub Pages.

Changes under `notebooklm/**` automatically trigger both validation and Pages deployment.

Before deployment, the workflow runs:

```bash
cd notebooklm
npm run check
```

This validates the 90 built-in prompts, workflow metadata, private-identifier guards, static paths, UI references, and social-preview metadata before the site is published.
