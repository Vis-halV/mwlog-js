import assert from "node:assert/strict";
import { mdToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders bold text", () => {
  assert.equal(mdToHtml("**bold**"), '<div class="mwlog"><p><strong>bold</strong></p></div>');
});

test("renders italic text", () => {
  assert.equal(mdToHtml("*italic*"), '<div class="mwlog"><p><em>italic</em></p></div>');
});

test("renders strikethrough text", () => {
  assert.equal(mdToHtml("~~strike~~"), '<div class="mwlog"><p><del>strike</del></p></div>');
});

test("renders inline code", () => {
  assert.equal(mdToHtml("`inline code`"), '<div class="mwlog"><p><code>inline code</code></p></div>');
});

test("escapes html inside inline code", () => {
  assert.equal(mdToHtml("`<span>`"), '<div class="mwlog"><p><code>&lt;span&gt;</code></p></div>');
});

test("does not format markdown inside inline code", () => {
  assert.equal(mdToHtml("`**code**`"), '<div class="mwlog"><p><code>**code**</code></p></div>');
});

test("renders nested bold and italic with valid tags", () => {
  assert.equal(
    mdToHtml("**bold and *italic***"),
    '<div class="mwlog"><p><strong>bold and <em>italic</em></strong></p></div>',
  );
});

test("preserves placeholder-like text outside inline code", () => {
  assert.equal(mdToHtml("\u0000INLINE_CODE_0\u0000"), '<div class="mwlog"><p>\u0000INLINE_CODE_0\u0000</p></div>');
});

test("renders links and images safely", () => {
  assert.equal(
    mdToHtml("[docs](https://example.com?a=1&b=2) ![logo](img.png)"),
    '<div class="mwlog"><p><a href="https://example.com?a=1&amp;b=2">docs</a> <img src="img.png" alt="logo" /></p></div>',
  );
});

test("does not format markdown markers inside urls", () => {
  assert.equal(
    mdToHtml("[docs](https://example.com/*path*) ![logo](img*2.png)"),
    '<div class="mwlog"><p><a href="https://example.com/*path*">docs</a> <img src="img*2.png" alt="logo" /></p></div>',
  );
});
