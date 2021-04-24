export function geniusify(str: string | string[]): string {
  if (Array.isArray(str)) {
    return str.map((s) => geniusify(s)).join('-and-');
  }

  return stripEnd(stripEnd(str, ' ('), ' -')
    .normalize('NFD')
    .trim()
    .toLowerCase()
    .replaceAll(/[ !]/g, '-')
    .replaceAll(/[.#'?\u0300-\u036f]|[^a-z0-9-]/g, '');
}

function stripEnd(str: string, char: string) {
  const index = str.indexOf(char);

  if (index === -1) {
    return str;
  }

  return str.substr(0, str.indexOf(char));
}
