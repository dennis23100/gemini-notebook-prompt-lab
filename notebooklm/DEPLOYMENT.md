# Deployment

Gemini Notebook Prompt Lab is published directly through this repository's GitHub Pages workflow.

## Live URL

- Prompt Lab: https://dennis23100.github.io/gemini-notebook-prompt-lab/

## Deployment model

The repository-level workflow at `../.github/workflows/pages.yml` validates the app, publishes the Prompt Lab at the repository Pages root, and also keeps a `/notebooklm/` compatibility copy for older shared links.

Changes under `notebooklm/**` automatically trigger both validation and Pages deployment.

Before deployment, the workflow runs:

```bash
cd notebooklm
npm run check
```

This validates the 132 built-in prompts, workflow metadata, private-identifier guards, static paths, UI references, and social-preview metadata before the site is published.
