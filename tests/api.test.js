import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { escapeHtml, mdToHtml, markdownToHtml, parse, themes } from "../index.js";
import { test } from "./test-helper.js";

test("public api exports both parser names", () => {
  assert.equal(markdownToHtml, mdToHtml);
});

test("public api exports parse alias", () => {
  assert.equal(parse, markdownToHtml);
});

test("public api exposes escapeHtml", () => {
  assert.equal(
    escapeHtml(`5 > 3 && 2 < 4 "quote" 'single'`),
    "5 &gt; 3 &amp;&amp; 2 &lt; 4 &quot;quote&quot; &#39;single&#39;",
  );
});

test("public api exposes bundled theme paths", () => {
  assert.deepEqual(themes, {
    default: "node_modules/mwlog-js/themes/default.css",
    light: "node_modules/mwlog-js/themes/light.css",
    dark: "node_modules/mwlog-js/themes/dark.css",
    custom: {
      sample: "node_modules/mwlog-js/themes/custom/sample.css",
    },
  });
});

test("markdown output is wrapped in mwlog container", () => {
  assert.equal(markdownToHtml("# Hello"), '<div class="mwlog"><h1>Hello</h1></div>');
});

test("theme files are published and scoped", () => {
  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

  assert.ok(packageJson.files.includes("themes"));
  assert.equal(packageJson.exports["./themes/*"], "./themes/*");

  for (const themeFile of [
    "../themes/default.css",
    "../themes/light.css",
    "../themes/dark.css",
    "../themes/custom/sample.css",
  ]) {
    const css = readFileSync(new URL(themeFile, import.meta.url), "utf8");
    assert.ok(css.includes(".mwlog {"));
  }
});
