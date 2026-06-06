import { createReadStream, existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const port = 4173;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function resolvePath(requestUrl) {
  const pathname = new URL(requestUrl, "http://localhost").pathname;
  const relativePath = pathname === "/" ? "playground/index.html" : pathname.slice(1);
  return path.resolve(rootDir, relativePath);
}

const server = http.createServer((request, response) => {
  const filePath = resolvePath(request.url);

  if (!filePath.startsWith(rootDir) || !existsSync(filePath)) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = path.extname(filePath);
  const contentType = contentTypes[extension] ?? "text/plain; charset=utf-8";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`mwlog-js playground: http://localhost:${port}`);
});
