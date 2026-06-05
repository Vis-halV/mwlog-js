import assert from "node:assert/strict";
import { mdToHtml } from "./index.js";

const md = `
# mwlog-js

Convert **Markdown** into *blog-ready* HTML with [docs](https://example.com).

#### Screenshot

![CLI preview](./preview.png)

## Features

- Fast
- Use \`npm install\`

### Future

1. Themes
2. Plugins

> Important note

\`\`\`js
console.log("Hello");
\`\`\`
`;

const expected = `
<div>
  <h1>mwlog-js</h1>
  <p>Convert <strong>Markdown</strong> into <em>blog-ready</em> HTML with <a href="https://example.com">docs</a>.</p>
  <h4>Screenshot</h4>
  <p><img src="./preview.png" alt="CLI preview"></p>
  <h2>Features</h2>
  <ul>
    <li>Fast</li>
    <li>Use <code>npm install</code></li>
  </ul>
  <h3>Future</h3>
  <ol>
    <li>Themes</li>
    <li>Plugins</li>
  </ol>
  <blockquote>Important note</blockquote>
  <pre><code>
console.log("Hello");
  </code></pre>
</div>
`.trim();

assert.equal(mdToHtml(md), expected);

console.log("All tests passed.");
