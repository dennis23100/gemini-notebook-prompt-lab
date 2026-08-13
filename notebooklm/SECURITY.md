# Security Policy

## Supported version

The `main` branch is the supported version while the project is pre-1.x/early-stage.

## Reporting a vulnerability

Please **do not open a public issue** for a vulnerability that could expose private data, enable script injection, or compromise imported prompt files. Use the private contact method on the maintainer's GitHub profile.

## Security model

The app is intentionally static and has no project backend, login system, analytics SDK, database, or API key. Imported prompt JSON is handled in the browser. The project does not execute imported JavaScript.

Security-sensitive areas include:

- DOM rendering of imported/custom prompt text;
- URL generation and external links;
- service-worker caching;
- JSON import/export;
- browser localStorage;
- any future browser-extension integration.

Contributors should prefer `textContent` over HTML injection for untrusted text and should keep external links using `rel="noopener noreferrer"` when opened in a new tab.
