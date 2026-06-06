import { parseBlocks } from "./block.js";
import { escapeHtml } from "./escape.js";

export function markdownToHtml(markdown) {
  return parseBlocks(markdown);
}

export const mdToHtml = markdownToHtml;
export { escapeHtml };
