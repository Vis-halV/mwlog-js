import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("returns empty output for empty input", () => {
  assert.equal(markdownToHtml(""), '<div class="mwlog"></div>');
});

test("returns empty output for whitespace-only input", () => {
  assert.equal(markdownToHtml("   "), '<div class="mwlog"></div>');
});

test("preserves broken emphasis as text", () => {
  assert.equal(markdownToHtml("**unclosed"), '<div class="mwlog"><p>**unclosed</p></div>');
});

test("preserves broken links as text", () => {
  assert.equal(markdownToHtml("[broken link("), '<div class="mwlog"><p>[broken link(</p></div>');
});

test("renders paragraphs across lines", () => {
  assert.equal(
    markdownToHtml("first line\nsecond line"),
    '<div class="mwlog"><p>first line second line</p></div>',
  );
});

test("renders blockquotes with escaped html", () => {
  assert.equal(
    markdownToHtml("> <img src=x>"),
    '<div class="mwlog"><blockquote>&lt;img src=x&gt;</blockquote></div>',
  );
});

test("escapes raw html in paragraphs", () => {
  assert.equal(
    markdownToHtml('<script>alert("xss")</script>'),
    '<div class="mwlog"><p>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</p></div>',
  );
});

test("handles large repeated input deterministically", () => {
  const markdown = Array.from(
    { length: 50 },
    (_, index) => `# Title ${index}\n\n**Bold ${index}**\n\n- Item ${index}`,
  ).join("\n\n");

  const html = markdownToHtml(markdown);

  assert.ok(html.startsWith('<div class="mwlog"><h1>Title 0</h1>'));
  assert.ok(html.includes("<strong>Bold 25</strong>"));
  assert.ok(html.endsWith("<ul><li>Item 49</li></ul></div>"));
});

test("renders mixed formatting blocks consistently", () => {
  const markdown = "# Heading\n\n**Bold**\n\n- Item\n\n`Code`";
  assert.equal(
    markdownToHtml(markdown),
    '<div class="mwlog"><h1>Heading</h1><p><strong>Bold</strong></p><ul><li>Item</li></ul><p>`Code`</p></div>',
  );
});
