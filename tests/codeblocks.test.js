import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("escapes fenced code blocks", () => {
  const markdown = '```js\nconsole.log("hello")\n```';
  assert.equal(
    markdownToHtml(markdown),
    "<pre><code>console.log(&quot;hello&quot;)</code></pre>",
  );
});

test("treats unterminated fences as code blocks", () => {
  const markdown = "```js\nconst x = 1";
  assert.equal(
    markdownToHtml(markdown),
    "<pre><code>const x = 1</code></pre>",
  );
});

test("escapes html inside fenced code blocks", () => {
  const markdown = "```html\n<script>alert(1)</script>\n```";
  assert.equal(
    markdownToHtml(markdown),
    "<pre><code>&lt;script&gt;alert(1)&lt;/script&gt;</code></pre>",
  );
});
