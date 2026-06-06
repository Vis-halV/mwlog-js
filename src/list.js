import { parseInline } from "./inline.js";

export function closeLists(stack, targetDepth = 0) {
  let html = "";

  while (stack.length > targetDepth) {
    html += "</li></ul>";
    stack.pop();
  }

  return html;
}

export function renderListItem(stack, depth, content) {
  let html = "";
  const safeDepth = Math.max(0, depth);
  const targetLevels = safeDepth + 1;

  if (targetLevels > stack.length) {
    while (stack.length < targetLevels) {
      html += "<ul><li>";
      stack.push("ul");
    }

    html += parseInline(content);
    return html;
  }

  if (targetLevels < stack.length) {
    html += closeLists(stack, targetLevels);
    html += "</li><li>";
    html += parseInline(content);
    return html;
  }

  if (stack.length === 0) {
    html += "<ul><li>";
    stack.push("ul");
    html += parseInline(content);
    return html;
  }

  html += "</li><li>";
  html += parseInline(content);
  return html;
}
