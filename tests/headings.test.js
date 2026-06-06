import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("renders headings through h6", () => {
  const markdown = ["# H1", "## H2", "### H3", "#### H4", "##### H5", "###### H6"].join("\n");
  assert.equal(
    markdownToHtml(markdown),
    "<h1>H1</h1><h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5><h6>H6</h6>",
  );
});

test("escapes html inside headings", () => {
  assert.equal(
    markdownToHtml("# <b>Title</b>"),
    "<h1>&lt;b&gt;Title&lt;/b&gt;</h1>",
  );
});
