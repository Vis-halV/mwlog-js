import assert from "node:assert/strict";
import { escapeHtml, mdToHtml, markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("public api exports both parser names", () => {
  assert.equal(markdownToHtml, mdToHtml);
});

test("public api exposes escapeHtml", () => {
  assert.equal(
    escapeHtml(`5 > 3 && 2 < 4 "quote" 'single'`),
    "5 &gt; 3 &amp;&amp; 2 &lt; 4 &quot;quote&quot; &#39;single&#39;",
  );
});
