# Community Prompt Packs — contribution model

The pack model makes it possible to contribute useful Prompt collections without editing application JavaScript.

## Proposed structure

Each community pack should be a versioned JSON file with:

- stable pack ID and display name;
- author / contributor attribution;
- license metadata;
- language metadata;
- prompt entries that follow the project prompt schema;
- source-grounding and anti-hallucination requirements;
- optional tags for audience, workflow, and subject area.

## Contribution flow

1. Fork the repository.
2. Add one JSON pack under a dedicated community-packs directory.
3. Run the project validator.
4. Open a pull request using a community-pack template.
5. CI validates schema, duplicate IDs, required metadata, and safety/grounding rules.
6. A maintainer reviews usefulness, provenance, and licensing before merge.

## Why this matters

This keeps the app local-first while creating a low-barrier path for educators, researchers, translators, and prompt authors to make real external contributions. It also makes reviews and releases auditable instead of accepting unstructured prompt dumps.
