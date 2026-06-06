# mwlog-js v1.2.0

Professional Foundation Release

## Highlights

- Refactored the parser into focused internal modules for maintainability and future growth
- Added URL sanitization for markdown links and images to block unsafe protocols
- Completed TypeScript support for the public API
- Expanded automated test coverage across parser behavior, edge cases, and security
- Added a lightweight playground for trying the parser locally
- Improved repository documentation, contribution guidance, and release trust signals

## Upgrade Notes

- No breaking changes
- No public API changes
- Existing imports continue to work:
  - `mdToHtml`
  - `markdownToHtml`
  - `escapeHtml`

## Release Summary

`mwlog-js` v1.2.0 focuses on the fundamentals that make a small package trustworthy:

- modular internals
- safer default output
- explicit typings
- structured tests
- clearer documentation
- local demonstrability through the playground

## Recommended Validation

Before publishing:

1. Run `npm test`
2. Run `npm run bench`
3. Open the playground through a local static server and confirm live updates
