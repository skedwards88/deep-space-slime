export function parseUrlQuery() {
  const searchParams = new URLSearchParams(document.location.search);
  const query = searchParams.get("id");

  return query;
}
