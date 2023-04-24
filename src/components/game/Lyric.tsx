import { useMemo, useRef } from 'react';

import { CollectionEntry, TracksResponse } from '../../types';
import { Quote } from '../icons/Quote';

import styles from './Lyric.module.scss';

type Props = {
  reload: number,
  track: CollectionEntry<TracksResponse>,
  lyrics: string[]
};

export function Lyric({ reload, track, lyrics }: Props) {
  const previousLyric = useRef<string>();
  const lyric = useMemo(() => {
    let next = previousLyric.current;

    while (next === previousLyric.current) {
      next = lyrics[Math.floor(Math.random() * lyrics.length)];

      if (lyrics.length === 1) {
        return next;
      }
    }

    previousLyric.current = next;

    return next;
  }, [track.track.id, reload]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.lyric}>
        <Quote className={styles.quote}/>
        {lyric}
      </div>
    </div>
  );
}
