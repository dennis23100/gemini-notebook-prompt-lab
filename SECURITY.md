# Security Policy

## Supported code

The `main` branch is the supported development line. Stable public releases use the `notebooklm-vX.Y.Z` tag convention.

## Reporting a vulnerability

Please **do not open a public issue** for a vulnerability that could expose private data, enable script injection, execute untrusted code, compromise imported files, or otherwise put users at risk.

Use the private contact method available through the primary maintainer's GitHub profile. If GitHub private vulnerability reporting is enabled for this repository, prefer that channel.

For non-sensitive hardening suggestions, a normal public issue is welcome.

## Security model

Gemini Notebook Prompt Lab is intentionally local-first and static. It has no project backend, login system, analytics SDK, database, or embedded API key. Prompt imports and local preferences are handled in the browser.

Security-sensitive areas include:

- rendering imported/custom content;
- URL parsing and external-link handling;
- service-worker caching;
- JSON import/export;
- browser localStorage;
- future browser-extension integrations;
- public showcase media that may contain private information.

Contributors should prefer safe DOM APIs for untrusted text, validate imported data, keep external links protected with `rel="noopener noreferrer"` when opened in a new tab, and avoid introducing remote code or unnecessary third-party dependencies.

Subproject implementation guidance is also available in [`notebooklm/SECURITY.md`](notebooklm/SECURITY.md).
