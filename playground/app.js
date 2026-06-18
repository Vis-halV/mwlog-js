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
const themeStylesheet = document.querySelector("#theme-stylesheet");
const themeSelect = document.querySelector("#theme-select");
const themeStorageKey = "mwlog-playground-theme";
const defaultTheme = "../themes/default.css";
const themeOptions = new Set(["../themes/default.css", "../themes/light.css", "../themes/dark.css"]);

function readSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    return themeOptions.has(savedTheme) ? savedTheme : null;
  } catch {
    return null;
  }
}

function saveTheme(themeHref) {
  try {
    localStorage.setItem(themeStorageKey, themeHref);
  } catch {
    // Theme preference persistence is best-effort only.
  }
}

function setTheme(themeHref) {
  const nextTheme = themeOptions.has(themeHref) ? themeHref : defaultTheme;
  themeStylesheet.href = nextTheme;
  themeSelect.value = nextTheme;
  saveTheme(nextTheme);
}

function render() {
  const markdown = markdownInput.value;
  const html = mdToHtml(markdown);

  htmlOutput.textContent = html;
  preview.innerHTML = html;
}

markdownInput.value = initialMarkdown;
markdownInput.addEventListener("input", render);
themeSelect.addEventListener("change", (event) => {
  setTheme(event.target.value);
});

setTheme(readSavedTheme() ?? defaultTheme);

render();
