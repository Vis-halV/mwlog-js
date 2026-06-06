import { markdownToHtml } from "./index.js";

const sample = `
# Benchmark

This is **bold**, *italic*, and ~~struck~~.

- one
  - nested
- two

> quote

\`\`\`html
<div>safe</div>
\`\`\`
`;

const iterations = 10000;
const start = process.hrtime.bigint();

for (let index = 0; index < iterations; index += 1) {
  markdownToHtml(sample);
}

const end = process.hrtime.bigint();
const seconds = Number(end - start) / 1e9;
const totalMilliseconds = seconds * 1000;
const averageMilliseconds = totalMilliseconds / iterations;
const docsPerSecond = Math.round(iterations / seconds);

console.log("mwlog-js Benchmark");
console.log("");
console.log(`Input Size: ${iterations.toLocaleString()} documents`);
console.log(`Total Time: ${totalMilliseconds.toFixed(3)}ms`);
console.log(`Average Time Per Document: ${averageMilliseconds.toFixed(6)}ms`);
console.log("");
console.log("Throughput:");
console.log(`${docsPerSecond.toLocaleString()} docs/sec`);
