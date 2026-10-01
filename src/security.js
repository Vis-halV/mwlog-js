const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

function extractProtocol(url) {
  const match = /^([a-zA-Z][a-zA-Z0-9+.-]*)\s*:/.exec(url);

  if (!match) {
    return null;
  }

  return `${match[1].toLowerCase()}:`;
}

export function sanitizeUrl(url) {
  const normalizedUrl = url.trim();

  if (normalizedUrl === "") {
    return null;
  }

  const protocol = extractProtocol(normalizedUrl);

  // URLs without a protocol are relative or protocol-relative URLs.
  if (protocol === null) {
    return normalizedUrl;
  }

  return ALLOWED_PROTOCOLS.has(protocol) ? normalizedUrl : null;
}
