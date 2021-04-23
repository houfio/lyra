import { load } from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import { validLyric } from '../utils/validLyric';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { artist, track } = req.query;

  if (typeof artist !== 'string' || typeof track !== 'string') {
    return res.json({
      success: false,
      message: 'Invalid parameters'
    });
  }

  let lyrics = await fetchLyrics(artist, track);
  const index = artist.indexOf('-and-');

  if (!lyrics && index !== -1) {
    lyrics = await fetchLyrics(artist.substr(0, index), track);
  }

  if (!lyrics) {
    return res.json({
      success: false,
      message: 'Unable to parse song'
    });
  }

  res.json({
    success: true,
    data: lyrics
  });
}

async function fetchLyrics(artist: string, track: string) {
  const response = await fetch(`https://genius.com/${artist}-${track}-lyrics`);

  if (!response.ok) {
    return;
  }

  const html = await response.text();

  const $ = load(html);
  const lyrics = $('.Lyrics__Root-sc-1ynbvzw-0 *, div[initial-content-for="lyrics"] *')
    .contents()
    .map((i, element) => element.type === 'text' ? $(element).text().trim() : '')
    .get()
    .filter(validLyric as any);

  if (!lyrics.length) {
    return;
  }

  return lyrics as any as string[];
}
