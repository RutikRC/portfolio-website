/**
 * Next.js calls `localStorage.getItem(...)` in its dev runtime in a few places.
 * In this environment a `localStorage` shim exists on the server but does not fully
 * implement the Web Storage API (notably, it misses `getItem`).
 *
 * Guard against that so SSR/dev overlay doesn't crash with:
 * `TypeError: localStorage.getItem is not a function`
 */
export function register() {
  const g = globalThis as unknown as { localStorage?: any };
  const ls = g.localStorage;

  if (ls && typeof ls.getItem !== "function") {
    g.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
    };
  }
}

