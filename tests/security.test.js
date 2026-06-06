import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("allows https links", () => {
  assert.equal(
    markdownToHtml("[Google](https://google.com)"),
    '<p><a href="https://google.com">Google</a></p>',
  );
});

test("allows http links", () => {
  assert.equal(
    markdownToHtml("[Google](http://google.com)"),
    '<p><a href="http://google.com">Google</a></p>',
  );
});

test("allows mailto links", () => {
  assert.equal(
    markdownToHtml("[Mail](mailto:test@example.com)"),
    '<p><a href="mailto:test@example.com">Mail</a></p>',
  );
});

test("blocks javascript links", () => {
  assert.equal(
    markdownToHtml("[x](javascript:alert(1))"),
    "<p><a>x</a></p>",
  );
});

test("blocks data links", () => {
  assert.equal(
    markdownToHtml("[x](data:text/html;base64,abc)"),
    "<p><a>x</a></p>",
  );
});

test("blocks vbscript links", () => {
  assert.equal(
    markdownToHtml("[x](vbscript:alert(1))"),
    "<p><a>x</a></p>",
  );
});

test("blocks file links", () => {
  assert.equal(
    markdownToHtml("[x](file:///secret)"),
    "<p><a>x</a></p>",
  );
});

test("blocks mixed-case javascript links", () => {
  assert.equal(
    markdownToHtml("[x](JaVaScRiPt:alert(1))"),
    "<p><a>x</a></p>",
  );
});

test("blocks leading-space javascript links", () => {
  assert.equal(
    markdownToHtml("[x]( JAVASCRIPT:alert(1))"),
    "<p><a>x</a></p>",
  );
});

test("blocks spaced-colon javascript links", () => {
  assert.equal(
    markdownToHtml("[x]( JAVASCRIPT :alert(1))"),
    "<p><a>x</a></p>",
  );
});

test("blocks javascript image sources", () => {
  assert.equal(
    markdownToHtml("![x](javascript:alert(1))"),
    '<p><img alt="x" /></p>',
  );
});

test("blocks data image sources", () => {
  assert.equal(
    markdownToHtml("![x](data:image/svg+xml;base64,abc)"),
    '<p><img alt="x" /></p>',
  );
});
