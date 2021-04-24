export function validLyric(lyric: string) {
  return lyric.length > 16
    && !lyric.startsWith('(')
    && !lyric.startsWith('[')
    && !lyric.startsWith(']')
    && !lyric.startsWith('*');
}
