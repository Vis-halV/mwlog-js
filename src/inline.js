import {
  INLINE_CODE_REGEX,
  LINK_OR_IMAGE_REGEX,
  STRIKETHROUGH_REGEX,
} from "./constants.js";
import { sanitizeUrl } from "./security.js";

function findClosingBold(text, start) {
  for (let index = start; index < text.length - 1; index += 1) {
    if (text[index] === "*" && text[index + 1] === "*" && text[index + 2] !== "*") {
      return index;
    }
  }

  return -1;
}

function findClosingItalic(text, start) {
  for (let index = start; index < text.length; index += 1) {
    if (text[index] === "*" && text[index - 1] !== "*" && text[index + 1] !== "*") {
      return index;
    }
  }

  return -1;
}

function renderEmphasis(text) {
  let html = "";
  let index = 0;

  while (index < text.length) {
    if (text[index] === "*" && text[index + 1] === "*") {
      const end = findClosingBold(text, index + 2);
      if (end !== -1) {
        html += `<strong>${renderEmphasis(text.slice(index + 2, end))}</strong>`;
        index = end + 2;
        continue;
      }
    }

    if (text[index] === "*" && text[index + 1] !== "*") {
      const end = findClosingItalic(text, index + 1);
      if (end !== -1) {
        html += `<em>${renderEmphasis(text.slice(index + 1, end))}</em>`;
        index = end + 1;
        continue;
      }
    }

    html += text[index];
    index += 1;
  }

  return html;
}

function renderDecorations(text) {
  return renderEmphasis(text.replace(STRIKETHROUGH_REGEX, "<del>$1</del>"));
}

function parseInlineText(text) {
  let html = "";
  let cursor = 0;

  for (const match of text.matchAll(LINK_OR_IMAGE_REGEX)) {
    const [token, marker, label, url] = match;
    html += renderDecorations(text.slice(cursor, match.index));

    const safeUrl = sanitizeUrl(url);
    if (marker === "!") {
      if (safeUrl === null) {
        html += `<img alt="${label}" />`;
      } else {
        html += `<img src="${safeUrl}" alt="${label}" />`;
      }

      cursor = match.index + token.length;
      continue;
    }

    const content = renderDecorations(label);
    if (safeUrl === null) {
      html += `<a>${content}</a>`;
    } else {
      html += `<a href="${safeUrl}">${content}</a>`;
    }

    cursor = match.index + token.length;
  }

  html += renderDecorations(text.slice(cursor));
  return html;
}

export function parseInline(text) {
  let html = "";
  let cursor = 0;

  for (const match of text.matchAll(INLINE_CODE_REGEX)) {
    html += parseInlineText(text.slice(cursor, match.index));
    html += `<code>${match[1]}</code>`;
    cursor = match.index + match[0].length;
  }

  html += parseInlineText(text.slice(cursor));
  return html;
}
