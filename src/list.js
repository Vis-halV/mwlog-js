import { parseInline } from "./inline.js";

export function closeLists(stack, targetDepth = 0) {
  let html = "";

  while (stack.length > targetDepth) {
    const tag = stack.pop();
    html += `</li></${tag}>`;
  }

  return html;
}

export function renderListItem(stack, depth, content, tag = "ul") {
  let html = "";
  const safeDepth = Math.max(0, depth);
  const targetLevels = safeDepth + 1;

  if (targetLevels < stack.length) {
    html += closeLists(stack, targetLevels);
  }

  if (stack.length === targetLevels && stack[targetLevels - 1] !== tag) {
    html += closeLists(stack, targetLevels - 1);
  }

  if (targetLevels > stack.length) {
    while (stack.length < targetLevels) {
      html += `<${tag}><li>`;
      stack.push(tag);
    }

    html += parseInline(content);
    return html;
  }

  if (stack.length === 0) {
    html += `<${tag}><li>`;
    stack.push(tag);
    html += parseInline(content);
    return html;
  }

  html += "</li><li>";
  html += parseInline(content);
  return html;
}
