export type ParsedMapsRoute = { origin: string; destination: string };

export function parseMapsUrl(url: string): ParsedMapsRoute | null {
  try {
    const parsed = new URL(url);

    // Pattern 1: ?api=1&origin=...&destination=...
    if (parsed.searchParams.has("origin") && parsed.searchParams.has("destination")) {
      const origin = parsed.searchParams.get("origin")!;
      const destination = parsed.searchParams.get("destination")!;
      if (origin && destination) return { origin, destination };
    }

    // Pattern 2: /maps/dir/Origin/Destination/@lat,lng,zoom
    const dirMatch = parsed.pathname.match(/\/maps\/dir\/([^/]+)\/([^/]+)/);
    if (dirMatch) {
      const origin = decodeURIComponent(dirMatch[1]);
      const destination = decodeURIComponent(dirMatch[2]);
      // Skip coordinate-only segments like "35.6894,139.6917"
      if (origin && destination && !/^[\d.,]+$/.test(origin)) {
        return { origin, destination };
      }
    }

    // Pattern 3: saddr= / daddr= (legacy format)
    if (parsed.searchParams.has("saddr") && parsed.searchParams.has("daddr")) {
      return {
        origin: parsed.searchParams.get("saddr")!,
        destination: parsed.searchParams.get("daddr")!,
      };
    }

    return null;
  } catch {
    return null;
  }
}

export function isShortMapsUrl(url: string): boolean {
  return /maps\.app\.goo\.gl|goo\.gl\/maps/.test(url);
}
