import {
  BLANK_LINE_REGEX,
  BLOCKQUOTE_REGEX,
  CODE_FENCE_REGEX,
  HEADING_REGEX,
  LINE_ENDINGS_REGEX,
  LIST_ITEM_REGEX,
} from "./constants.js";
import { escapeHtml } from "./escape.js";
import { parseInline } from "./inline.js";
import { closeLists, renderListItem } from "./list.js";

export function parseBlocks(markdown) {
  const lines = markdown.replace(LINE_ENDINGS_REGEX, "\n").split("\n");
  const html = [];
  const listStack = [];
  let inCodeBlock = false;
  let codeLines = [];
  let paragraphLines = [];

  function flushParagraph() {
    if (paragraphLines.length === 0) {
      return;
    }

    const content = paragraphLines.join(" ");
    html.push(`<p>${parseInline(content)}</p>`);
    paragraphLines = [];
  }

  function flushCodeBlock() {
    if (!inCodeBlock) {
      return;
    }

    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    inCodeBlock = false;
    codeLines = [];
  }

  for (const line of lines) {
    if (inCodeBlock) {
      if (CODE_FENCE_REGEX.test(line)) {
        flushCodeBlock();
      } else {
        codeLines.push(line);
      }

      continue;
    }

    if (CODE_FENCE_REGEX.test(line)) {
      flushParagraph();
      html.push(closeLists(listStack));
      inCodeBlock = true;
      codeLines = [];
      continue;
    }

    if (BLANK_LINE_REGEX.test(line)) {
      flushParagraph();
      html.push(closeLists(listStack));
      continue;
    }

    const headingMatch = HEADING_REGEX.exec(line);
    if (headingMatch) {
      flushParagraph();
      html.push(closeLists(listStack));
      const level = headingMatch[1].length;
      const content = parseInline(escapeHtml(headingMatch[2].trim()));
      html.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    const quoteMatch = BLOCKQUOTE_REGEX.exec(line);
    if (quoteMatch) {
      flushParagraph();
      html.push(closeLists(listStack));
      const content = parseInline(escapeHtml(quoteMatch[1].trim()));
      html.push(`<blockquote>${content}</blockquote>`);
      continue;
    }

    const listMatch = LIST_ITEM_REGEX.exec(line);
    if (listMatch) {
      flushParagraph();
      const indent = listMatch[1].replace(/\t/g, "  ").length;
      const depth = Math.floor(indent / 2);
      const content = escapeHtml(listMatch[2].trim());
      html.push(renderListItem(listStack, depth, content));
      continue;
    }

    if (listStack.length > 0) {
      html.push(closeLists(listStack));
    }

    paragraphLines.push(escapeHtml(line.trim()));
  }

  flushParagraph();
  if (inCodeBlock) {
    flushCodeBlock();
  }
  html.push(closeLists(listStack));

  return html.join("");
}
