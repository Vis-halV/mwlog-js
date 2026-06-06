import {
  BOLD_REGEX,
  IMAGE_REGEX,
  ITALIC_REGEX,
  LINK_REGEX,
  STRIKETHROUGH_REGEX,
} from "./constants.js";
import { sanitizeUrl } from "./security.js";

export function parseInline(text) {
  return text
    .replace(IMAGE_REGEX, (_match, alt, src) => {
      const safeSrc = sanitizeUrl(src);
      if (safeSrc === null) {
        return `<img alt="${alt}" />`;
      }

      return `<img src="${safeSrc}" alt="${alt}" />`;
    })
    .replace(LINK_REGEX, (_match, label, href) => {
      const safeHref = sanitizeUrl(href);
      if (safeHref === null) {
        return `<a>${label}</a>`;
      }

      return `<a href="${safeHref}">${label}</a>`;
    })
    .replace(STRIKETHROUGH_REGEX, "<del>$1</del>")
    .replace(BOLD_REGEX, "<strong>$1</strong>")
    .replace(ITALIC_REGEX, "<em>$1</em>");
}
