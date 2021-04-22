export function buildQuery(params: Record<string, string>) {
  return new URLSearchParams(params).toString();
}
