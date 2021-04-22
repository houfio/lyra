export function geniusify(str: string) {
  return stripEnd(stripEnd(str, '('), '-')
    .trim()
    .replaceAll('.', '')
    .replaceAll(' ', '-')
    .toLowerCase();
}

function stripEnd(str: string, char: string) {
  const index = str.indexOf(char);

  if (index === -1) {
    return str;
  }

  return str.substr(0, str.indexOf(char));
}
