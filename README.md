# mwlog-js

A lightweight, dependency-free Markdown-to-HTML converter for JavaScript.

ESM-native. TypeScript declarations included. Output is wrapped in `<div class="mwlog">`.

## Install

```bash
npm install mwlog-js
```

## Usage

```js
import { mdToHtml } from "mwlog-js";

const html = mdToHtml("# Hello world");
// <div class="mwlog"><h1>Hello world</h1></div>
```

## API

```js
import { escapeHtml, mdToHtml, themes } from "mwlog-js";
```

- `mdToHtml(markdown)`
- `escapeHtml(text)`
- `themes`

## Supported Markdown

- Headings: `#` through `######`
- Paragraphs
- Bold: `**text**`
- Italic: `*text*`
- Strikethrough: `~~text~~`
- Inline code: `` `code` ``
- Links: `[label](url)`
- Images: `![alt](src)`
- Blockquotes: `> quote`
- Unordered lists: `- item`
- Ordered lists: `1. item`
- Fenced code blocks with optional language: ```` ```js ````

## Security

Raw HTML is escaped before rendering. Link and image URLs are trimmed, and unsafe protocols are blocked:

- `javascript:`
- `data:`
- `vbscript:`
- `file:`

Blocked links render without `href`. Blocked images render without `src`.

## Themes

Theme CSS files are included in the published package.

Available themes:

- themes.medium.light
- themes.medium.dark
- themes.awwwards.light
- themes.awwwards.dark

The corresponding CSS files are:

- themes/medium-light.css
- themes/medium-dark.css
- themes/awwwards-light.css
- themes/awwwards-dark.css

You can use the theme paths from the public API:

import { themes } from "mwlog-js";

console.log(themes.medium.light);
console.log(themes.medium.dark);
console.log(themes.awwwards.light);
console.log(themes.awwwards.dark);


Or reference a theme directly from the published package:

<link rel="stylesheet" href="mwlog-js/themes/medium-light.css" />
<link rel="stylesheet" href="mwlog-js/themes/medium-dark.css" />
<link rel="stylesheet" href="mwlog-js/themes/awwwards-light.css" />
<link rel="stylesheet" href="mwlog-js/themes/awwwards-dark.css" />

## Test

```bash
npm test
```

## License

MIT
