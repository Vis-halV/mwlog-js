function parseInline(text) {
  const codeSegments = [];
  let html = text.replace(/`([^`]+)`/g, (_, code) => {
    const placeholder = `__CODE_${codeSegments.length}__`;
    codeSegments.push(`<code>${code}</code>`);
    return placeholder;
  });

  html = html
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  return html.replace(/__CODE_(\d+)__/g, (_, index) => codeSegments[Number(index)]);
}

function closeList(lines, listType) {
  if (listType === "ul") {
    lines.push("  </ul>");
    return;
  }

  if (listType === "ol") {
    lines.push("  </ol>");
  }
}

export function mdToHtml(markdown) {
  const lines = markdown.split("\n");
  const output = ["<div>"];
  let activeList = null;
  let inCodeBlock = false;
  let codeLines = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }

      if (inCodeBlock) {
        output.push("  <pre><code>");
        for (const codeLine of codeLines) {
          output.push(codeLine);
        }
        output.push("  </code></pre>");
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }
      continue;
    }

    if (trimmed.startsWith("#### ")) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }
      output.push(`  <h4>${parseInline(trimmed.slice(5))}</h4>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }
      output.push(`  <h3>${parseInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }
      output.push(`  <h2>${parseInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("# ")) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }
      output.push(`  <h1>${parseInline(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("> ")) {
      if (activeList) {
        closeList(output, activeList);
        activeList = null;
      }
      output.push(`  <blockquote>${parseInline(trimmed.slice(2))}</blockquote>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      if (activeList === "ol") {
        output.push("  </ol>");
        activeList = null;
      }
      if (!activeList) {
        output.push("  <ul>");
        activeList = "ul";
      }
      output.push(`    <li>${parseInline(trimmed.slice(2))}</li>`);
      continue;
    }

    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      if (activeList === "ul") {
        output.push("  </ul>");
        activeList = null;
      }
      if (!activeList) {
        output.push("  <ol>");
        activeList = "ol";
      }
      output.push(`    <li>${parseInline(orderedMatch[2])}</li>`);
      continue;
    }

    if (activeList) {
      closeList(output, activeList);
      activeList = null;
    }

    output.push(`  <p>${parseInline(trimmed)}</p>`);
  }

  if (inCodeBlock) {
    output.push("  <pre><code>");
    for (const codeLine of codeLines) {
      output.push(codeLine);
    }
    output.push("  </code></pre>");
  }

  if (activeList) {
    closeList(output, activeList);
  }

  output.push("</div>");

  return output.join("\n");
}
