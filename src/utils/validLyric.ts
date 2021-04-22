export function validLyric(lyric: string) {
  return lyric.length && !lyric.startsWith('(') && !lyric.startsWith('[');
}
