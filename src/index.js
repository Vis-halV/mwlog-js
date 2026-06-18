import { parseBlocks } from "./block.js";
import { escapeHtml } from "./escape.js";
import { themes } from "./themes.js";

export function markdownToHtml(markdown) {
  return `<div class="mwlog">${parseBlocks(markdown)}</div>`;
}

export const mdToHtml = markdownToHtml;
export const parse = markdownToHtml;
export { escapeHtml };
export { themes };
