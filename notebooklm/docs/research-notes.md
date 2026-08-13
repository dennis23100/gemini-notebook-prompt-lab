# Research Notes

This file records product patterns studied while turning an internal age-adaptive teaching prompt sheet into a reusable open-source tool. It is not a dependency list and no third-party source code is vendored.

## Patterns worth keeping

### Browseable prompt products beat static lists

Large prompt communities make prompts easier to discover, contribute, reuse, self-host, and integrate. This project applies that lesson at a deliberately smaller scope: filters, deep links, import/export, favorites, schemas, and contribution docs.

### Notebook-oriented prompts need explicit source grounding

A NotebookLM/Gemini Notebook prompt can contain many visual/style instructions. The project therefore separates “source matter” from “presentation style” and validates that built-in prompts include anti-invention language.

### Placeholders turn templates into tools

Prompt Lab uses named placeholders and form fields instead of forcing users to edit long template text manually.

### Chains make prompts repeatable

A useful workflow often has more than one stage: extract → transform → verify. The Chain Builder exposes that structure without automatically submitting anything.

### Prompt quality should be inspectable

The linter is intentionally local and deterministic. Contributors can debate a rule, add a test, and change it through a PR.

## Upstream references

See `THIRD_PARTY_NOTICES.md` for repositories and license notes.
