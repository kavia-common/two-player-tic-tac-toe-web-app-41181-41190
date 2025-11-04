/**
 * PUBLIC_INTERFACE
 * No-op service worker registration to keep CRA happy and reduce console noise.
 * In development it does nothing. In production builds, CRA ignores this unless
 * explicitly imported and used. Kept for compatibility.
 */
export function register() {
  // Intentionally empty: we do not use service workers in this template.
}
export function unregister() {
  // Intentionally empty.
}
