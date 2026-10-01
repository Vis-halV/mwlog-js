import {
  INLINE_CODE_REGEX,
  LINK_OR_IMAGE_REGEX,
  STRIKETHROUGH_REGEX,
} from "./constants.js";
import { sanitizeUrl } from "./security.js";

function findClosingBold(text, start) {
  for (let index = start; index < text.length - 1; index += 1) {
    if (
      text[index] === "*" &&
      text[index + 1] === "*" &&
      text[index + 2] !== "*"
    ) {
      return index;
    }
  }

  return -1;
}

function findClosingItalic(text, start) {
  for (let index = start; index < text.length; index += 1) {
    if (
      text[index] === "*" &&
      text[index - 1] !== "*" &&
      text[index + 1] !== "*"
    ) {
      return index;
    }
  }

  return -1;
}

function renderLinkOrImage(marker, label, url) {
  const safeUrl = sanitizeUrl(url);

  if (marker === "!") {
    if (safeUrl === null) {
      return `<img alt="${label}" />`;
    }

    return `<img src="${safeUrl}" alt="${label}" />`;
  }

  const content = renderEmphasis(label);

  if (safeUrl === null) {
    return `<a>${content}</a>`;
  }

  return `<a href="${safeUrl}">${content}</a>`;
}

function findLinkAt(text, start) {
  const regex = new RegExp(
    LINK_OR_IMAGE_REGEX.source,
    LINK_OR_IMAGE_REGEX.flags,
  );

  regex.lastIndex = start;
  const match = regex.exec(text);

  if (match && match.index === start) {
    return match;
  }

  return null;
}

function renderEmphasis(text) {
  let html = "";
  let index = 0;

  while (index < text.length) {
    const link = findLinkAt(text, index);

    if (link) {
      html += renderLinkOrImage(link[1], link[2], link[3]);
      index += link[0].length;
      continue;
    }

    if (text[index] === "*" && text[index + 1] === "*") {
      const end = findClosingBold(text, index + 2);

      if (end !== -1) {
        html += `<strong>${renderEmphasis(
          text.slice(index + 2, end),
        )}</strong>`;
        index = end + 2;
        continue;
      }

      // An unmatched bold opener stays literal.
      html += "**";
      index += 2;
      continue;
    }

    if (text[index] === "*" && text[index + 1] !== "*") {
      const end = findClosingItalic(text, index + 1);

      if (end !== -1) {
        html += `<em>${renderEmphasis(
          text.slice(index + 1, end),
        )}</em>`;
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
  return renderEmphasis(
    text.replace(STRIKETHROUGH_REGEX, "<del>$1</del>"),
  );
}

function parseInlineText(text) {
  return renderDecorations(text);
}

export function parseInline(text) {
  const codeRegex = new RegExp(
    INLINE_CODE_REGEX.source,
    INLINE_CODE_REGEX.flags,
  );

  let html = "";
  let cursor = 0;

  for (const match of text.matchAll(codeRegex)) {
    html += parseInlineText(text.slice(cursor, match.index));
    html += `<code>${match[1]}</code>`;
    cursor = match.index + match[0].length;
  }

  html += parseInlineText(text.slice(cursor));

  return html;
}
