import assert from "node:assert/strict";
import { mdToHtml } from "../index.js";
import { test } from "./test-helper.js";

test("allows https links", () => {
  assert.equal(
    mdToHtml("[Google](https://google.com)"),
    '<div class="mwlog"><p><a href="https://google.com">Google</a></p></div>',
  );
});

test("allows http links", () => {
  assert.equal(
    mdToHtml("[Google](http://google.com)"),
    '<div class="mwlog"><p><a href="http://google.com">Google</a></p></div>',
  );
});

test("allows mailto links", () => {
  assert.equal(
    mdToHtml("[Mail](mailto:test@example.com)"),
    '<div class="mwlog"><p><a href="mailto:test@example.com">Mail</a></p></div>',
  );
});

test("blocks javascript links", () => {
  assert.equal(
    mdToHtml("[x](javascript:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks data links", () => {
  assert.equal(
    mdToHtml("[x](data:text/html;base64,abc)"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks vbscript links", () => {
  assert.equal(
    mdToHtml("[x](vbscript:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks file links", () => {
  assert.equal(
    mdToHtml("[x](file:///secret)"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks mixed-case javascript links", () => {
  assert.equal(
    mdToHtml("[x](JaVaScRiPt:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks leading-space javascript links", () => {
  assert.equal(
    mdToHtml("[x]( JAVASCRIPT:alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks spaced-colon javascript links", () => {
  assert.equal(
    mdToHtml("[x]( JAVASCRIPT :alert(1))"),
    '<div class="mwlog"><p><a>x</a></p></div>',
  );
});

test("blocks javascript image sources", () => {
  assert.equal(
    mdToHtml("![x](javascript:alert(1))"),
    '<div class="mwlog"><p><img alt="x" /></p></div>',
  );
});

test("blocks data image sources", () => {
  assert.equal(
    mdToHtml("![x](data:image/svg+xml;base64,abc)"),
    '<div class="mwlog"><p><img alt="x" /></p></div>',
  );
});
