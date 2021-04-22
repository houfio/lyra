const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateCode() {
  const length = Math.floor(Math.random() * 86) + 43;

  return Array(length)
    .fill(undefined)
    .reduce((acc) => `${acc}${characters.charAt(Math.floor(Math.random() * characters.length))}`, '');
}
