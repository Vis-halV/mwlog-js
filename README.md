# mwlog-js

A lightweight JavaScript markdown-to-HTML converter focused on simplicity, performance, and security.

`mwlog-js` is designed for small to medium content rendering tasks where a minimal, easy-to-audit parser is preferable to a large markdown ecosystem. The package is dependency-free, ESM-native, typed, and tested.

## Features

- Markdown to HTML conversion for core blog-style content
- TypeScript support through bundled declaration files
- HTML escaping for rendered text and fenced code blocks
- Security-focused URL sanitization for links and images
- Lightweight modular architecture with zero runtime dependencies
- Structured automated test coverage across parser behavior and security cases

## Project Status

Active development.

The package is being improved in incremental releases with an emphasis on maintainability, predictable behavior, and safe defaults. Feature scope is intentionally narrow.

## Installation

```bash
npm install mwlog-js
```

```bash
yarn add mwlog-js
```

## Quick Start

```js
import { parse } from "mwlog-js";

const html = parse("# Hello");
```

To try the parser interactively in this repository:

```bash
npm run playground
```

Then open `http://localhost:4173`.

## Supported Markdown

Currently supported syntax:

- Headings: `#` through `######`
- Paragraphs
- Bold: `**text**`
- Italic: `*text*`
- Strikethrough: `~~text~~`
- Links: `[label](url)`
- Images: `![alt](src)`
- Blockquotes: `> quote`
- Fenced code blocks using triple backticks
- Unordered lists with basic nesting

Current parser behavior that is intentionally documented for accuracy:

- Ordered lists are not converted to `<ol>`
- Inline code using backticks is preserved as plain text

## Security

`mwlog-js` applies two safety layers by default.

### HTML Escaping

Raw HTML is escaped before inline formatting is applied. This prevents markdown content such as `<script>` tags from rendering as executable HTML.

Fenced code blocks are also escaped, so embedded HTML examples render as text inside `<pre><code>`.

### URL Sanitization

Links and images are validated before `href` or `src` attributes are emitted.

Allowed protocols:

- `https:`
- `http:`
- `mailto:`

Blocked protocols:

- `javascript:`
- `data:`
- `vbscript:`
- `file:`

Blocked links are rendered without `href`. Blocked images are rendered without `src`. This keeps unsafe protocols from producing executable or privileged browser behavior.

## TypeScript

The package includes declaration files for all public exports.

```ts
import { parse } from "mwlog-js";

const markdown = "# Hello";
const html: string = parse(markdown);
```

Public API:

- `parse(markdown: string): string`
- `mdToHtml(markdown: string): string`
- `markdownToHtml(markdown: string): string`
- `escapeHtml(text: string): string`
- `themes.medium.light`
- `themes.medium.dark`
- `themes.awwwards.light`
- `themes.awwwards.dark`

## Themes

`mwlog-js` ships CSS theme assets alongside the parser. Markdown still converts to semantic HTML, and styling stays separate so the same assets can be reused by CLI tools and future UI packages.

### Using a Built-in Theme

```html
<link
  rel="stylesheet"
  href="./node_modules/mwlog-js/themes/medium-dark.css"
/>
```

### Using a Custom Theme

```html
<link
  rel="stylesheet"
  href="./my-theme.css"
/>
```

Generated HTML:

```html
<div class="mwlog">
  ...
</div>
```

## Benchmarks

Benchmark tooling is included in the repository and can be run locally:

```bash
npm run bench
```

Example output from the current benchmark script on this repository state:

```txt
mwlog-js Benchmark

Input Size: 10,000 documents
Total Time: 143.204ms
Average Time Per Document: 0.014320ms

Throughput:
69,830 docs/sec
```

Benchmark results will vary by machine and Node.js version.

## Framework Usage

### React

```jsx
import { parse } from "mwlog-js";

function Preview({ markdown }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: parse(markdown),
      }}
    />
  );
}
```

### Vue

```vue
<script setup>
import { computed } from "vue";
import { mdToHtml } from "mwlog-js";

const props = defineProps({
  markdown: {
    type: String,
    required: true,
  },
});

const html = computed(() => mdToHtml(props.markdown));
</script>

<template>
  <div v-html="html"></div>
</template>
```

### Svelte

```svelte
<script>
  import { mdToHtml } from "mwlog-js";

  export let markdown = "";

  $: html = mdToHtml(markdown);
</script>

{@html html}
```

### Angular

```ts
import { Component, Input } from "@angular/core";
import { mdToHtml } from "mwlog-js";

@Component({
  selector: "app-preview",
  template: `<div [innerHTML]="html"></div>`,
})
export class PreviewComponent {
  @Input() markdown = "";

  get html(): string {
    return mdToHtml(this.markdown);
  }
}
```

## Contributing

Contributions are welcome. For local setup, testing, coding standards, and pull request expectations, see [CONTRIBUTING.md](C:/Users/visha/OneDrive/Desktop/mwlog/CONTRIBUTING.md).

## License

MIT
