import assert from "node:assert/strict";
import { mdToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("handles unicode input", () => {
  assert.equal(
    mdToHtml("# Héllo 世界 🌍"),
    '<div class="mwlog"><h1>Héllo 世界 🌍</h1></div>',
  );
});

test("handles links containing asterisks", () => {
  assert.equal(
    mdToHtml("[docs](https://example.com/*path*)"),
    '<div class="mwlog"><p><a href="https://example.com/*path*">docs</a></p></div>',
  );
});

test("handles emphasis around links", () => {
  assert.equal(
    mdToHtml("**[docs](https://example.com)**"),
    '<div class="mwlog"><p><strong><a href="https://example.com">docs</a></strong></p></div>',
  );
});

test("handles nested emphasis", () => {
  assert.equal(
    mdToHtml("**bold *italic* text**"),
    '<div class="mwlog"><p><strong>bold <em>italic</em> text</strong></p></div>',
  );
});

test("preserves malformed links", () => {
  assert.equal(
    mdToHtml("[broken](https://example.com"),
    '<div class="mwlog"><p>[broken](https://example.com</p></div>',
  );
});

test("preserves malformed emphasis", () => {
  assert.equal(
    mdToHtml("**bold *italic"),
    '<div class="mwlog"><p>**bold *italic</p></div>',
  );
});

test("escapes HTML-looking adversarial input", () => {
  const html = mdToHtml('<script>alert("xss")</script>');
  assert.ok(!html.includes("<script>"));
  assert.ok(html.includes("&lt;script&gt;"));
});

test("handles combined formatting and links", () => {
  assert.doesNotThrow(() => {
    mdToHtml(
      "**bold** *italic* ~~deleted~~ [link](https://example.com) ![image](https://example.com/a.png)",
    );
  });
});

test("handles large repeated input", () => {
  const input = "**bold** ".repeat(10000);
  const html = mdToHtml(input);

  assert.equal(typeof html, "string");
  assert.ok(html.startsWith('<div class="mwlog">'));
});

test("handles arbitrary punctuation without throwing", () => {
  assert.doesNotThrow(() => {
    mdToHtml(
      "[]() [[]] (( )) ** * ~~ ` ``` # - 1. > [x]( ) ![x]( )",
    );
  });
});
