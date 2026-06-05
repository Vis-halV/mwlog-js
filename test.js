import { markdownToHtml } from "./index.js";

const markdown = `
# Welcome

This is **bold** text.

This is *italic* text.
`;

const html = markdownToHtml(markdown);

console.log("Markdown:");
console.log(markdown);

console.log("\nHTML:");
console.log(html);