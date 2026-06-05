# mwlog-js
Developer friendly content transformation toolkit for converting and processing Markdown to blog.

## Usage

```js
import { mdToHtml } from "mwlog-js";

const markdown = `
# Hello

#### Demo image

![CLI preview](./preview.png)

Use \`npm install\`
`;

const html = mdToHtml(markdown);
```

Output:

```html
<div>
  <h1>Hello</h1>
  <h4>Demo image</h4>
  <p><img src="./preview.png" alt="CLI preview"></p>
  <p>Use <code>npm install</code></p>
</div>
```

## Supported syntax

- Headings
- Paragraphs
- Bold
- Italic
- Unordered lists
- Ordered lists
- Links
- Images
- Inline code
- Fenced code blocks
- Blockquotes
