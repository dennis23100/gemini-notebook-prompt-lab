# Prompt Design Guide

The built-in prompt pack treats a prompt as a compact specification with five layers:

1. **Grounding** — what sources may be used.
2. **Audience** — who the artifact is for.
3. **Task** — what should be produced.
4. **Structure/style** — how the artifact should communicate.
5. **Failure behavior** — what to do when information is missing.

## Grounding block

A strong default is conceptually:

```text
Use only the selected/uploaded sources for factual content.
Preserve important terms, names, quotations, and teaching points accurately.
If the source does not support a claim, do not invent it; identify the gap instead.
Style instructions below describe presentation only and are not source content.
```

This project intentionally makes grounding explicit because a visual-style prompt can otherwise blur the distinction between **what the source says** and **how the output should look**.

## Age adaptation

Age adaptation should change communication, not facts. Typical dimensions include sentence length, visual density, abstraction, pacing, emotional intensity, and assumed background knowledge.

The built-in age labels come from the original teaching pack. They are defaults, not universal developmental rules.

## Linter philosophy

The local linter does not judge model output. It only answers inspectable questions such as “does this prompt explicitly name the audience?” or “does it contain a missing-information rule?” A lower score is a cue to review, not proof that a prompt is bad.
