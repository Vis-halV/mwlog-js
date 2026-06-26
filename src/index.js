import { parseBlocks } from "./block.js";
import { escapeHtml } from "./escape.js";
import { themes } from "./themes.js";

export function mdToHtml(markdown) {
  return `<div class="mwlog">${parseBlocks(markdown)}</div>`;
}

export { escapeHtml };
export { themes };
