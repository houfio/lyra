import { load } from 'cheerio';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

import { validLyric } from '../utils/validLyric';

const data: Record<string, string[]> = {};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { artist, track } = req.query;

  if (typeof artist !== 'string' || typeof track !== 'string') {
    return res.json({
      success: false,
      message: 'Invalid parameters'
    });
  }

  const key = `${artist}-${track}`;

  if (data[key]) {
    return res.json({
      success: true,
      data: data[key]
    });
  }

  let lyrics: string[] | undefined;
  let index = -1;
  let artists = artist;

  do {
    console.log('Fetching', track, 'by', artists);

    lyrics = await fetchLyrics(artists, track);
    index = artists.lastIndexOf('-and-');
    artists = artists.substr(0, index);
  } while (!lyrics && index !== -1)

  if (!lyrics) {
    return res.json({
      success: false,
      message: 'Unable to parse song'
    });
  }

  data[key] = lyrics;

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
  const lyrics = $('div[data-lyrics-container="true"] *')
    .contents()
    .map((i, element) => element.type === 'text' ? $(element).text().trim() : '')
    .get()
    .filter(validLyric as any)
    .filter((v, i, a) => a.indexOf(v) === i);

  if (!lyrics.length) {
    return;
  }

  return lyrics as any as string[];
}
