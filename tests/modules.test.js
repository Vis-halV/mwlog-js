import assert from "node:assert/strict";
import {
  BLANK_LINE_REGEX,
  BLOCKQUOTE_REGEX,
  CODE_FENCE_REGEX,
  HEADING_REGEX,
  IMAGE_REGEX,
  ITALIC_REGEX,
  LINE_ENDINGS_REGEX,
  LINK_REGEX,
  LIST_ITEM_REGEX,
} from "../src/constants.js";
import { parseBlocks } from "../src/block.js";
import { escapeHtml } from "../src/escape.js";
import { parseInline } from "../src/inline.js";
import { closeLists, renderListItem } from "../src/list.js";
import { sanitizeUrl } from "../src/security.js";
import { mdToHtml, parse, themes } from "../src/index.js";
import { test } from "./test-helper.js";

test("src index exports parser aliases and themes", () => {
  assert.equal(parse, mdToHtml);
  assert.equal(mdToHtml("text"), '<div class="mwlog"><p>text</p></div>');
  assert.equal(themes.medium.light, "node_modules/mwlog-js/themes/medium-light.css");
});

test("block parser normalizes windows line endings", () => {
  assert.equal(parseBlocks("first\r\nsecond"), "<p>first second</p>");
});

test("inline parser renders links images and emphasis", () => {
  assert.equal(
    parseInline("**bold** *em* [site](https://example.com) ![alt](logo.png)"),
    '<strong>bold</strong> <em>em</em> <a href="https://example.com">site</a> <img src="logo.png" alt="alt" />',
  );
});

test("list helpers open close and continue nested lists", () => {
  const stack = [];
  let html = renderListItem(stack, 0, "parent");
  html += renderListItem(stack, 1, "child");
  html += closeLists(stack);

  assert.equal(html, "<ul><li>parent<ul><li>child</li></ul></li></ul>");
  assert.deepEqual(stack, []);
});

test("security helper trims urls and blocks unsafe protocols", () => {
  assert.equal(sanitizeUrl(" https://example.com "), "https://example.com");
  assert.equal(sanitizeUrl("data:text/html,hello"), null);
});

test("escape helper encodes html-sensitive characters", () => {
  assert.equal(escapeHtml(`<tag attr="value">Tom & 'Jerry'</tag>`), "&lt;tag attr=&quot;value&quot;&gt;Tom &amp; &#39;Jerry&#39;&lt;/tag&gt;");
});

test("packed regex constants match supported markdown syntax", () => {
  assert.ok(LINE_ENDINGS_REGEX.test("\r\n"));
  assert.ok(CODE_FENCE_REGEX.test("```js"));
  assert.ok(BLANK_LINE_REGEX.test("  "));
  assert.deepEqual(HEADING_REGEX.exec("### Heading")?.slice(1), ["###", "Heading"]);
  assert.deepEqual(BLOCKQUOTE_REGEX.exec("> quote")?.slice(1), ["quote"]);
  assert.deepEqual(LIST_ITEM_REGEX.exec("  - item")?.slice(1), ["  ", "item"]);
  assert.deepEqual(IMAGE_REGEX.exec("![alt](img.png)")?.slice(1), ["alt", "img.png"]);
  assert.deepEqual(LINK_REGEX.exec("[label](https://example.com)")?.slice(1), ["label", "https://example.com"]);
  assert.deepEqual(ITALIC_REGEX.exec("*text*")?.slice(1), ["text"]);
});
