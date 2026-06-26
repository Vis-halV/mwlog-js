const ESCAPE_MAP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const ESCAPE_REGEX = /[&<>"']/g;

export function escapeHtml(text) {
  return text.replace(ESCAPE_REGEX, (char) => ESCAPE_MAP[char]);
}
