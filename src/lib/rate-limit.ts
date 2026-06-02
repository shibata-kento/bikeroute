/** インメモリレートリミット: 1IPあたり WINDOW_MS 内に MAX_REQUESTS 回まで */
const WINDOW_MS = 60_000; // 1分
const MAX_REQUESTS = 10;

interface Record {
  count: number;
  resetAt: number;
}

const store = new Map<string, Record>();

export function checkRateLimit(ip: string): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { ok: true, remaining: MAX_REQUESTS - entry.count, resetAt: entry.resetAt };
}
