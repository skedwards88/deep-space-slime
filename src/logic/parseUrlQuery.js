export function parseUrlQuery() {
  const searchParams = new URLSearchParams(document.location.search);
  const query = searchParams.get("id");

  if (!query) return;

  const seed = query.substring("custom-".length);

  return seed;
}
