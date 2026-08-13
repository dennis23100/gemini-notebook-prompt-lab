# Launch Kit

This document turns the project into a repeatable, evidence-first launch rather than a “please star my repo” campaign.

## Primary story

Gemini Notebook Prompt Lab grew from a real teaching problem:

> The same trusted source often should **not** be presented with exactly the same wording, density, pacing, and visual direction for every audience.

The project turns that idea into a local-first open-source workflow for Gemini Notebook / NotebookLM.

## What to show first

Use this order when introducing the project:

1. **The problem** — one trusted source, different audiences.
2. **The real-world origin** — in-person teaching experience, including a session with 100+ attendees.
3. **The live app** — choose → copy → open Gemini Notebook.
4. **The controlled Showcase** — the same source across 3 themes × 3 audiences.
5. **The OSS surface** — Issues, Releases, tests, contribution docs.

Do not describe the 100+ teaching attendees as GitHub users or product users unless that becomes independently true.

## Asset checklist

### Ready

- [x] GitHub hero graphic
- [x] Live Prompt Lab
- [x] Reproducible Showcase page
- [x] Public controlled Showcase source
- [x] v1.x Releases
- [x] Open Issues / `help wanted`
- [x] English + Traditional Chinese README

### Still needed before the strongest launch

- [ ] 9 real Showcase outputs (3 themes × 3 audiences)
- [ ] one privacy-reviewed teaching still or short clip
- [ ] 10–20 second product demo recording/GIF
- [ ] GitHub repository Social Preview set in repository settings
- [ ] repository pinned on maintainer profile
- [ ] focused About description + correct Pages website URL

## Audience-specific launch angles

### 1. Gemini Notebook / NotebookLM users

**Headline idea**

> I built an open-source Prompt Lab for Gemini Notebook instead of another prompt list

**Core story**

Most prompt collections are static lists. This project lets you browse 90 age-adaptive prompts, compose new source-grounded workflows, compare audience variants, share filtered views, and run local deterministic prompt checks.

**Show**

- live app;
- one controlled source;
- Children vs Youth vs Adults;
- Copy → Open Gemini Notebook.

**CTA**

> Try one prompt with a source you already use. If the workflow breaks or feels confusing, open a feedback Issue — that is more useful than a passive star.

### 2. Educators / trainers / community teachers

**Headline idea**

> Should the same source be presented the same way to a child, a young adult, and a mature learner?

**Core story**

The project came from real teaching experience. Content accuracy matters, but audience fit, pacing, and information density matter too. The app makes those presentation choices visible and reusable while keeping the prompt grounded in the source.

**Show**

- privacy-reviewed teaching-context image;
- one source → three audiences;
- a simple “choose / copy / open” workflow.

Avoid leading with implementation details such as PWA, localStorage, or deterministic linting unless the audience asks.

### 3. Developers / OSS communities

**Headline idea**

> A zero-backend, dependency-free prompt workflow app with deterministic linting

**Core story**

The interesting part is not the number of prompts. The project treats prompts as versioned data with validation, source-grounding rules, reproducible workflows, local state, shareable URLs, CI, and a contribution surface.

**Technical points**

- vanilla JS / CSS / HTML;
- no application backend;
- no runtime dependencies;
- localStorage for user state;
- deterministic prompt linter instead of an opaque AI score;
- JSON prompt packs + validation;
- PWA/offline shell;
- GitHub Actions validation + Pages deployment;
- reproducible Showcase manifest.

**CTA**

> I’d especially value concrete feedback on accessibility, prompt schema design, and the reproducibility of the Showcase workflow.

### 4. Show HN-style framing

**Title idea**

> Show HN: A local-first workflow lab for Gemini Notebook prompts

**Opening**

> Most prompt repositories are Markdown lists. I wanted prompts to behave more like reusable, testable workflows.

Then briefly explain:

```text
Prompt Library → Prompt Lab → optional Chain → local Quality Check → Gemini Notebook
```

Keep the first post short and let the live app + repository carry the detail.

Before posting, re-check the community’s current submission rules; do not rely on a saved rule from an earlier date.

## Traditional Chinese short launch draft

> 我原本是在真實教學現場遇到一個問題：同一份來源內容，真的適合用完全一樣的字量、節奏和視覺方式呈現給不同年齡層嗎？
>
> 後來我把這套做法整理成一個免費開源的 Gemini Notebook Prompt Lab。現在有 90 組分齡 Prompt、30 種視覺主題、10 種工作流，而且整個網站不需要登入、沒有後端，收藏與最近使用都只留在瀏覽器本機。
>
> 我現在最想收的不是「幫我按 Star」，而是真正有用 NotebookLM / Gemini Notebook 的人告訴我：哪個流程不直覺？哪個 Prompt 真的幫到你？哪個地方需要修？

Then attach the live app + controlled Showcase when real examples are ready.

## English short launch draft

> I started this from a real teaching problem: the same trusted source often shouldn’t be presented with identical wording, density, pacing, and visuals for every audience.
>
> I turned that workflow into an open-source Gemini Notebook Prompt Lab: 90 age-adaptive prompts, 30 visual themes, 10 workflows, local recent history, shareable filters, and deterministic prompt checks — with no app backend or account required.
>
> I’m looking for people who actually use NotebookLM / Gemini Notebook. What breaks, feels confusing, or would make this genuinely useful in your workflow?

## Feedback → maintenance loop

After launch, prefer this cycle:

```text
real use
  ↓
feedback / Issue
  ↓
triage + reproduce
  ↓
focused fix / PR
  ↓
CI
  ↓
small Release
  ↓
reply to the original user
```

That is healthier open-source activity than artificial issue counts or star-trading.

## What to record

For future project/application evidence, keep factual public records of:

- external Issues and useful comments;
- external PRs / reviews;
- Releases tied to real feedback;
- contributor names (when public);
- documented educator / workflow use cases that people explicitly permit you to share;
- public stars/forks as secondary signals.

Never invent monthly users/downloads and never convert event attendance into product-usage claims.
