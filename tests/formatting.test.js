import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders bold text", () => {
  assert.equal(markdownToHtml("**bold**"), '<div class="mwlog"><p><strong>bold</strong></p></div>');
});

test("renders italic text", () => {
  assert.equal(markdownToHtml("*italic*"), '<div class="mwlog"><p><em>italic</em></p></div>');
});

test("renders strikethrough text", () => {
  assert.equal(markdownToHtml("~~strike~~"), '<div class="mwlog"><p><del>strike</del></p></div>');
});

test("preserves current inline code behavior", () => {
  assert.equal(markdownToHtml("`inline code`"), '<div class="mwlog"><p>`inline code`</p></div>');
});

test("preserves current nested formatting behavior", () => {
  assert.equal(
    markdownToHtml("**bold and *italic***"),
    '<div class="mwlog"><p><strong>bold and <em>italic</strong></em></p></div>',
  );
});

test("renders links and images safely", () => {
  assert.equal(
    markdownToHtml("[docs](https://example.com?a=1&b=2) ![logo](img.png)"),
    '<div class="mwlog"><p><a href="https://example.com?a=1&amp;b=2">docs</a> <img src="img.png" alt="logo" /></p></div>',
  );
});
