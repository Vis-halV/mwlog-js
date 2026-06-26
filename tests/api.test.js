import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { escapeHtml, mdToHtml, themes } from "../index.js";
import { test } from "./test-helper.js";

test("public api exports mdToHtml", () => {
  assert.equal(mdToHtml("# Hello"), '<div class="mwlog"><h1>Hello</h1></div>');
});

test("public api exposes escapeHtml", () => {
  assert.equal(
    escapeHtml(`5 > 3 && 2 < 4 "quote" 'single'`),
    "5 &gt; 3 &amp;&amp; 2 &lt; 4 &quot;quote&quot; &#39;single&#39;",
  );
});

test("public api exposes bundled theme paths", () => {
  assert.deepEqual(themes, {
    medium: {
      light: "mwlog-js/themes/medium-light.css",
      dark: "mwlog-js/themes/medium-dark.css",
    },
    awwwards: {
      light: "mwlog-js/themes/awwwards-light.css",
      dark: "mwlog-js/themes/awwwards-dark.css",
    },
  });
});

test("public api themes are immutable", () => {
  assert.ok(Object.isFrozen(themes));
  assert.ok(Object.isFrozen(themes.medium));
  assert.ok(Object.isFrozen(themes.awwwards));
});

test("markdown output is wrapped in mwlog container", () => {
  assert.equal(mdToHtml("# Hello"), '<div class="mwlog"><h1>Hello</h1></div>');
});

test("theme files referenced by the public api exist and are scoped", () => {
  for (const family of Object.values(themes)) {
    for (const themePath of Object.values(family)) {
      const packageRelativePath = themePath.replace("mwlog-js/", "../");
      const css = readFileSync(new URL(packageRelativePath, import.meta.url), "utf8");

      assert.ok(css.includes(".mwlog"));
    }
  }
});

test("package publishes public entrypoints and theme assets", () => {
  const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

  assert.equal(packageJson.main, "index.js");
  assert.equal(packageJson.types, "index.d.ts");
  assert.deepEqual(packageJson.exports["."], {
    types: "./index.d.ts",
    import: "./index.js",
  });
  assert.equal(packageJson.exports["./themes/*"], "./themes/*");
  assert.ok(packageJson.files.includes("index.js"));
  assert.ok(packageJson.files.includes("index.d.ts"));
  assert.ok(packageJson.files.includes("src"));
  assert.ok(packageJson.files.includes("themes"));
  assert.ok(packageJson.files.includes("README.md"));
  assert.ok(packageJson.files.includes("LICENSE"));
});

test("packed type declarations and readme document current themes", () => {
  const declarations = readFileSync(new URL("../index.d.ts", import.meta.url), "utf8");
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");

  assert.ok(declarations.includes("medium: Readonly"));
  assert.ok(declarations.includes("awwwards: Readonly"));
  assert.ok(declarations.includes("mdToHtml"));
  assert.ok(!declarations.includes("default: string"));
  assert.ok(readme.includes("themes.medium.light"));
  assert.ok(readme.includes("themes.awwwards.dark"));
  assert.ok(readme.includes("themes/medium-dark.css"));
});
