import assert from "node:assert/strict";
import { mdToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("escapes fenced code blocks", () => {
  const markdown = '```js\nconsole.log("hello")\n```';
  assert.equal(
    mdToHtml(markdown),
    '<div class="mwlog"><pre><code class="language-js">console.log(&quot;hello&quot;)</code></pre></div>',
  );
});

test("treats unterminated fences as code blocks", () => {
  const markdown = "```js\nconst x = 1";
  assert.equal(
    mdToHtml(markdown),
    '<div class="mwlog"><pre><code class="language-js">const x = 1</code></pre></div>',
  );
});

test("escapes html inside fenced code blocks", () => {
  const markdown = "```html\n<script>alert(1)</script>\n```";
  assert.equal(
    mdToHtml(markdown),
    '<div class="mwlog"><pre><code class="language-html">&lt;script&gt;alert(1)&lt;/script&gt;</code></pre></div>',
  );
});

test("renders fenced code blocks without a language", () => {
  const markdown = "```\nplain\n```";
  assert.equal(mdToHtml(markdown), '<div class="mwlog"><pre><code>plain</code></pre></div>');
});
