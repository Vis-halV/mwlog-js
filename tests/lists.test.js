import assert from "node:assert/strict";
import { mdToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders unordered lists", () => {
  assert.equal(
    mdToHtml("- item\n- item"),
    '<div class="mwlog"><ul><li>item</li><li>item</li></ul></div>',
  );
});

test("renders nested unordered lists", () => {
  assert.equal(
    mdToHtml("- parent\n  - child"),
    '<div class="mwlog"><ul><li>parent<ul><li>child</li></ul></li></ul></div>',
  );
});

test("renders ordered lists", () => {
  assert.equal(
    mdToHtml("1. item\n2. item"),
    '<div class="mwlog"><ol><li>item</li><li>item</li></ol></div>',
  );
});

test("renders nested ordered lists", () => {
  assert.equal(
    mdToHtml("1. parent\n  1. child"),
    '<div class="mwlog"><ol><li>parent<ol><li>child</li></ol></li></ol></div>',
  );
});

test("separates unordered and ordered lists at the same depth", () => {
  assert.equal(
    mdToHtml("- unordered\n1. ordered"),
    '<div class="mwlog"><ul><li>unordered</li></ul><ol><li>ordered</li></ol></div>',
  );
});

test("renders deeper nested list structures", () => {
  assert.equal(
    mdToHtml("- parent\n  - child\n    - grandchild"),
    '<div class="mwlog"><ul><li>parent<ul><li>child<ul><li>grandchild</li></ul></li></ul></li></ul></div>',
  );
});
