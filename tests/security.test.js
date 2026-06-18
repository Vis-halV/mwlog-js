import assert from "node:assert/strict";
import { markdownToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("allows https links", () => {
  assert.equal(
    markdownToHtml("[Google](https://google.com)"),
    '<div class="mwlog"><p><a href="https://google.com">Google</a></p></div>',
  );
});

test("allows http links", () => {
  assert.equal(
    markdownToHtml("[Google](http://google.com)"),
    '<div class="mwlog"><p><a href="http://google.com">Google</a></p></div>',
  );
});

test("allows mailto links", () => {
  assert.equal(
    markdownToHtml("[Mail](mailto:test@example.com)"),
    '<div class="mwlog"><p><a href="mailto:test@example.com">Mail</a></p></div>',
  );
});

test("blocks javascript links", () => {
  assert.equal(
    markdownToHtml("[x](javascript:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks data links", () => {
  assert.equal(
    markdownToHtml("[x](data:text/html;base64,abc)"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks vbscript links", () => {
  assert.equal(
    markdownToHtml("[x](vbscript:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks file links", () => {
  assert.equal(
    markdownToHtml("[x](file:///secret)"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks mixed-case javascript links", () => {
  assert.equal(
    markdownToHtml("[x](JaVaScRiPt:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks leading-space javascript links", () => {
  assert.equal(
    markdownToHtml("[x]( JAVASCRIPT:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks spaced-colon javascript links", () => {
  assert.equal(
    markdownToHtml("[x]( JAVASCRIPT :alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks javascript image sources", () => {
  assert.equal(
    markdownToHtml("![x](javascript:alert(1))"),
    '<div class="mwlog"><p><img alt="x" /></p></div>',
  );
});

test("blocks data image sources", () => {
  assert.equal(
    markdownToHtml("![x](data:image/svg+xml;base64,abc)"),
    '<div class="mwlog"><p><img alt="x" /></p></div>',
  );
});
