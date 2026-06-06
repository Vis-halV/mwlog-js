# Changelog

All notable changes to this project are documented in this file.

## [1.2.0] - 2026-06-07

### Changed

- Refactored the parser into focused internal modules under `src/`
- Preserved the public API while improving internal maintainability

### Security

- Added URL sanitization for markdown links and images
- Blocked unsafe protocols including `javascript:`, `data:`, `vbscript:`, and `file:`
- Preserved HTML escaping for rendered content and fenced code blocks

### TypeScript

- Added complete type coverage for all public exports

### Testing

- Reorganized tests into focused suites by concern
- Expanded regression coverage for security, block parsing, formatting, lists, and edge cases
