# Contributing

Thank you for contributing to `mwlog-js`.

## Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Run the test suite with `npm test`.

The project currently has no runtime dependencies, so setup should remain small and predictable.

## Running Tests

Use the standard test command:

```bash
npm test
```

If you want to inspect parser throughput locally, you can also run:

```bash
npm run bench
```

## Coding Standards

- Preserve the public API unless a breaking change is explicitly planned
- Prefer small, focused modules over large cross-cutting changes
- Keep parser behavior deterministic and covered by tests
- Add or update tests whenever behavior changes
- Favor readability and maintainability over clever implementations
- Keep documentation aligned with actual supported behavior

## Pull Request Process

1. Create a branch with a clear, task-focused name.
2. Keep pull requests scoped to a single concern when possible.
3. Include tests for behavior changes or bug fixes.
4. Update documentation if public behavior or workflow changes.
5. Write a concise pull request description that explains the problem and the solution.

## Issue Reporting

When reporting a bug, include:

- Package version
- Node.js version
- Operating system
- Minimal markdown input that reproduces the issue
- Expected output
- Actual output

When proposing a feature, describe the use case first, then the API or syntax you think would help.
