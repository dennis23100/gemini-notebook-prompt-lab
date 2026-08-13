# Security Policy

## Supported code

The `main` branch is the supported development line for Toolkit 60. Individual subprojects may document more specific supported versions.

## Reporting a vulnerability

Please **do not open a public issue** for a vulnerability that could expose private data, enable script injection, execute untrusted code, compromise imported files, or otherwise put users at risk.

Use the private contact method available through the primary maintainer's GitHub profile. If GitHub private vulnerability reporting is enabled for this repository, prefer that channel.

For non-sensitive hardening suggestions, a normal public issue is welcome.

## Current security model

The active Gemini Notebook Prompt Lab is intentionally local-first and static: it has no project backend, login system, analytics SDK, database, or embedded API key. Prompt imports and local preferences are handled in the browser.

Security-sensitive areas include:

- rendering imported/custom content;
- URL parsing and external-link handling;
- service-worker caching;
- JSON import/export;
- browser localStorage;
- future browser-extension integrations;
- any future video-processing pipeline that handles untrusted media files.

Subproject-specific guidance is available in files such as [`notebooklm/SECURITY.md`](notebooklm/SECURITY.md).
