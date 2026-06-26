const BLOCKED_PROTOCOLS = new Set(["javascript", "data", "vbscript", "file"]);

function extractProtocol(url) {
  const match = /^([a-zA-Z][a-zA-Z0-9+.-]*)\s*:/.exec(url);
  if (!match) {
    return null;
  }

  return match[1].toLowerCase();
}

export function sanitizeUrl(url) {
  const normalizedUrl = url.trim();
  const protocol = extractProtocol(normalizedUrl);

  if (protocol && BLOCKED_PROTOCOLS.has(protocol)) {
    return null;
  }

  return normalizedUrl;
}
