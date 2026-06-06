import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("returns empty output for empty input", () => {
  assert.equal(markdownToHtml(""), "");
});

test("returns empty output for whitespace-only input", () => {
  assert.equal(markdownToHtml("   "), "");
});

test("preserves broken emphasis as text", () => {
  assert.equal(markdownToHtml("**unclosed"), "<p>**unclosed</p>");
});

test("preserves broken links as text", () => {
  assert.equal(markdownToHtml("[broken link("), "<p>[broken link(</p>");
});

test("renders paragraphs across lines", () => {
  assert.equal(
    markdownToHtml("first line\nsecond line"),
    "<p>first line second line</p>",
  );
});

test("renders blockquotes with escaped html", () => {
  assert.equal(
    markdownToHtml("> <img src=x>"),
    "<blockquote>&lt;img src=x&gt;</blockquote>",
  );
});

test("escapes raw html in paragraphs", () => {
  assert.equal(
    markdownToHtml('<script>alert("xss")</script>'),
    "<p>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</p>",
  );
});

test("handles large repeated input deterministically", () => {
  const markdown = Array.from(
    { length: 50 },
    (_, index) => `# Title ${index}\n\n**Bold ${index}**\n\n- Item ${index}`,
  ).join("\n\n");

  const html = markdownToHtml(markdown);

  assert.ok(html.startsWith("<h1>Title 0</h1>"));
  assert.ok(html.includes("<strong>Bold 25</strong>"));
  assert.ok(html.endsWith("<ul><li>Item 49</li></ul>"));
});

test("renders mixed formatting blocks consistently", () => {
  const markdown = "# Heading\n\n**Bold**\n\n- Item\n\n`Code`";
  assert.equal(
    markdownToHtml(markdown),
    "<h1>Heading</h1><p><strong>Bold</strong></p><ul><li>Item</li></ul><p>`Code`</p>",
  );
});
