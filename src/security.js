const BLOCKED_PROTOCOLS = new Set(["javascript", "data", "vbscript", "file"]);

function normalizeUrl(url) {
  return url.trim();
}

function extractProtocol(url) {
  const match = /^([a-zA-Z][a-zA-Z0-9+.-]*)\s*:/.exec(url);
  if (!match) {
    return null;
  }

  return match[1].toLowerCase();
}

export function sanitizeUrl(url) {
  const normalizedUrl = normalizeUrl(url);
  const protocol = extractProtocol(normalizedUrl);

  if (protocol && BLOCKED_PROTOCOLS.has(protocol)) {
    return null;
  }

  return normalizedUrl;
}
