export function geniusify(str: string | string[]): string {
  if (Array.isArray(str)) {
    return str.map((s) => geniusify(s)).join('-and-');
  }

  return stripEnd(stripEnd(str, '('), '-')
    .trim()
    .replaceAll('.', '')
    .replaceAll(' ', '-')
    .replaceAll('?', '-')
    .toLowerCase();
}

function stripEnd(str: string, char: string) {
  const index = str.indexOf(char);

  if (index === -1) {
    return str;
  }

  return str.substr(0, str.indexOf(char));
}
