export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function textOrFallback(value: unknown, fallback = "Not specified") {
  const text = String(value ?? "").trim();
  return text ? escapeHtml(text) : fallback;
}
