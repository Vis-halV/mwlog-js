import { mdToHtml } from "../index.js";

const initialMarkdown = `# mwlog-js

**Bold**

*Italic*

- Item One
- Item Two

\`\`\`js
console.log("hello");
\`\`\`
`;

const markdownInput = document.querySelector("#markdown-input");
const htmlOutput = document.querySelector("#html-output");
const preview = document.querySelector("#preview");

function render() {
  const markdown = markdownInput.value;
  const html = mdToHtml(markdown);

  htmlOutput.textContent = html;
  preview.innerHTML = html;
}

markdownInput.value = initialMarkdown;
markdownInput.addEventListener("input", render);

render();
