export async function encodeCode(code: string) {
  const encoded = new TextEncoder().encode(code);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  const result = String.fromCharCode(...new Uint8Array(buffer));

  return btoa(result)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}
