export const LINE_ENDINGS_REGEX = /\r\n/g;
export const CODE_FENCE_REGEX = /^```/;
export const BLANK_LINE_REGEX = /^\s*$/;
export const HEADING_REGEX = /^(#{1,6})\s+(.*)$/;
export const BLOCKQUOTE_REGEX = /^>\s?(.*)$/;
export const LIST_ITEM_REGEX = /^(\s*)[-*+]\s+(.*)$/;

export const IMAGE_REGEX = /!\[([^\]]*?)\]\(((?:[^()\n]+|\([^()\n]*\))*)\)/g;
export const LINK_REGEX = /\[([^\]]+?)\]\(((?:[^()\n]+|\([^()\n]*\))*)\)/g;
export const STRIKETHROUGH_REGEX = /~~(.*?)~~/g;
export const BOLD_REGEX = /\*\*(.*?)\*\*/g;
export const ITALIC_REGEX = /(?<!\*)\*([^*\n]+?)\*(?!\*)/g;
