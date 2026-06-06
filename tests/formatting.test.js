import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders bold text", () => {
  assert.equal(markdownToHtml("**bold**"), "<p><strong>bold</strong></p>");
});

test("renders italic text", () => {
  assert.equal(markdownToHtml("*italic*"), "<p><em>italic</em></p>");
});

test("renders strikethrough text", () => {
  assert.equal(markdownToHtml("~~strike~~"), "<p><del>strike</del></p>");
});

test("preserves current inline code behavior", () => {
  assert.equal(markdownToHtml("`inline code`"), "<p>`inline code`</p>");
});

test("preserves current nested formatting behavior", () => {
  assert.equal(
    markdownToHtml("**bold and *italic***"),
    "<p><strong>bold and <em>italic</strong></em></p>",
  );
});

test("renders links and images safely", () => {
  assert.equal(
    markdownToHtml("[docs](https://example.com?a=1&b=2) ![logo](img.png)"),
    '<p><a href="https://example.com?a=1&amp;b=2">docs</a> <img src="img.png" alt="logo" /></p>',
  );
});
