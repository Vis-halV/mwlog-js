import {
  BLANK_LINE_REGEX,
  BLOCKQUOTE_REGEX,
  CODE_FENCE_REGEX,
  HEADING_REGEX,
  LINE_ENDINGS_REGEX,
  LIST_ITEM_REGEX,
  ORDERED_LIST_ITEM_REGEX,
} from "./constants.js";
import { escapeHtml } from "./escape.js";
import { parseInline } from "./inline.js";
import { closeLists, renderListItem } from "./list.js";

export function parseBlocks(markdown) {
  const lines = markdown.replace(LINE_ENDINGS_REGEX, "\n").split("\n");
  const html = [];
  const listStack = [];
  let inCodeBlock = false;
  let codeLang = "";
  let codeLines = [];
  let paragraphLines = [];
  let blockquoteLines = [];

  function flushParagraph() {
    if (paragraphLines.length === 0) {
      return;
    }

    const content = paragraphLines.join(" ");
    html.push(`<p>${parseInline(content)}</p>`);
    paragraphLines = [];
  }

  function flushBlockquote() {
    if (blockquoteLines.length === 0) {
      return;
    }

    const content = parseInline(escapeHtml(blockquoteLines.join(" ")));
    html.push(`<blockquote><p>${content}</p></blockquote>`);
    blockquoteLines = [];
  }

  function flushCodeBlock() {
    if (!inCodeBlock) {
      return;
    }

    const langAttr = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : "";
    html.push(`<pre><code${langAttr}>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    inCodeBlock = false;
    codeLang = "";
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
      flushBlockquote();
      html.push(closeLists(listStack));
      inCodeBlock = true;
      codeLang = line.replace(CODE_FENCE_REGEX, "").trim();
      codeLines = [];
      continue;
    }

    if (BLANK_LINE_REGEX.test(line)) {
      flushParagraph();
      flushBlockquote();
      html.push(closeLists(listStack));
      continue;
    }

    const headingMatch = HEADING_REGEX.exec(line);
    if (headingMatch) {
      flushParagraph();
      flushBlockquote();
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
      blockquoteLines.push(quoteMatch[1].trim());
      continue;
    }

    flushBlockquote();

    const listMatch = LIST_ITEM_REGEX.exec(line);
    if (listMatch) {
      flushParagraph();
      const indent = listMatch[1].replace(/\t/g, "  ").length;
      const depth = Math.floor(indent / 2);
      const content = escapeHtml(listMatch[2].trim());
      html.push(renderListItem(listStack, depth, content));
      continue;
    }

    const orderedMatch = ORDERED_LIST_ITEM_REGEX.exec(line);
    if (orderedMatch) {
      flushParagraph();
      const indent = orderedMatch[1].replace(/\t/g, "  ").length;
      const depth = Math.floor(indent / 2);
      const content = escapeHtml(orderedMatch[2].trim());
      html.push(renderListItem(listStack, depth, content, "ol"));
      continue;
    }

    if (listStack.length > 0) {
      html.push(closeLists(listStack));
    }

    paragraphLines.push(escapeHtml(line.trim()));
  }

  flushParagraph();
  flushBlockquote();
  if (inCodeBlock) {
    flushCodeBlock();
  }
  html.push(closeLists(listStack));

  return html.join("");
}
