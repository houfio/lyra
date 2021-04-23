export function validLyric(lyric: string) {
  return lyric.length > 6
    && !lyric.startsWith('(')
    && !lyric.startsWith('[');
}
