import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders unordered lists", () => {
  assert.equal(
    markdownToHtml("- item\n- item"),
    "<ul><li>item</li><li>item</li></ul>",
  );
});

test("renders nested unordered lists", () => {
  assert.equal(
    markdownToHtml("- parent\n  - child"),
    "<ul><li>parent<ul><li>child</li></ul></li></ul>",
  );
});

test("preserves current ordered list behavior", () => {
  assert.equal(
    markdownToHtml("1. item\n2. item"),
    "<p>1. item 2. item</p>",
  );
});

test("renders deeper nested list structures", () => {
  assert.equal(
    markdownToHtml("- parent\n  - child\n    - grandchild"),
    "<ul><li>parent<ul><li>child<ul><li>grandchild</li></ul></li></ul></li></ul>",
  );
});
