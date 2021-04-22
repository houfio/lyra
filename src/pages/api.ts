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

  const response = await fetch(`https://genius.com/${artist}-${track}-lyrics`);

  if (!response.ok) {
    return res.json({
      success: false,
      message: 'Unable to parse song'
    });
  }

  const html = await response.text();

  const $ = load(html);
  const lyrics = $('.Lyrics__Root-sc-1ynbvzw-0 *, div[initial-content-for="lyrics"] *')
    .contents()
    .map((i, element) => element.type === 'text' ? $(element).text().trim() : '')
    .get()
    .filter(validLyric as any);

  res.json({
    success: true,
    data: lyrics
  });
}
