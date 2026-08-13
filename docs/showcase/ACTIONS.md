# Download the Showcase Pack without installing anything

You do **not** need Node.js or a local clone to prepare the first nine showcase prompts.

## GitHub-only workflow

1. Open the repository on GitHub.
2. Open the **Actions** tab.
3. Choose **Prepare Showcase Pack**.
4. Open the newest successful run.
5. Scroll to **Artifacts**.
6. Download:

```text
gemini-notebook-showcase-prompts
```

The artifact contains:

- `source.md` — the shared project-authored demo source;
- `SUBMISSION.md` — provenance/privacy checklist;
- `generated-prompts/` — nine ready-to-copy Prompt files;
- `generated-prompts/cases.json` — actual Prompt IDs and case metadata.

## What to do next

For each of the nine cases:

```text
shared source
   ↓
matching exported Prompt
   ↓
Gemini Notebook
   ↓
real generated output
   ↓
privacy / provenance check
   ↓
showcase image
```

The first milestone is complete when all nine cells in [`RESULTS.md`](RESULTS.md) can honestly change from `pending` to `ready`.

Do not substitute illustrative mockups for real Gemini Notebook outputs. The live app already has CSS-based illustrative previews; this workflow exists specifically to collect reproducible **real examples**.
