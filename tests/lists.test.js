import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders unordered lists", () => {
  assert.equal(
    markdownToHtml("- item\n- item"),
    '<div class="mwlog"><ul><li>item</li><li>item</li></ul></div>',
  );
});

test("renders nested unordered lists", () => {
  assert.equal(
    markdownToHtml("- parent\n  - child"),
    '<div class="mwlog"><ul><li>parent<ul><li>child</li></ul></li></ul></div>',
  );
});

test("preserves current ordered list behavior", () => {
  assert.equal(
    markdownToHtml("1. item\n2. item"),
    '<div class="mwlog"><p>1. item 2. item</p></div>',
  );
});

test("renders deeper nested list structures", () => {
  assert.equal(
    markdownToHtml("- parent\n  - child\n    - grandchild"),
    '<div class="mwlog"><ul><li>parent<ul><li>child<ul><li>grandchild</li></ul></li></ul></li></ul></div>',
  );
});
