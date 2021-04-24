import { useMemo } from 'react';

import { CollectionEntry, TracksResponse } from '../../types';
import { Quote } from '../icons/Quote';

import styles from './Lyric.module.scss';

type Props = {
  lyric: object,
  track: CollectionEntry<TracksResponse>,
  lyrics: string[]
};

export function Lyric({ lyric: key, track, lyrics }: Props) {
  const lyric = useMemo(() => lyrics[Math.floor(Math.random() * lyrics.length)], [track.track.id, key]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.lyric}>
        <Quote className={styles.quote}/>
        {lyric}
      </div>
    </div>
  );
}
