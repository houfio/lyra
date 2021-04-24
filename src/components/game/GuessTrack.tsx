import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';

import { CollectionEntry, TracksResponse } from '../../types';
import { Button } from '../forms/Button';
import { Reload } from '../icons/Reload';
import { Skip } from '../icons/Skip';

import styles from './GuessTrack.module.scss';
import { Track } from './Track';

type Props = {
  tracks: CollectionEntry<TracksResponse>[],
  onGuess: (track: CollectionEntry<TracksResponse>) => void,
  onReload: () => void,
  onSkip: () => void
};

export function GuessTrack({ tracks, onGuess, onReload, onSkip }: Props) {
  const fuse = useMemo(() => new Fuse(tracks, {
    keys: ['track.name', 'track.artists.name']
  }), [tracks]);
  const [search, setSearch] = useState('');
  const results = useMemo(() => fuse.search(search, { limit: 3 }), [fuse, search]);

  return (
    <div>
      <div className={styles.wrapper}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
          placeholder="Enter your guess here..."
        />
        <Button text="Reload lyric" className={styles.reload} onClick={onReload}>
          <Reload className={styles.icon}/>
        </Button>
        <Button text="Skip" className={styles.skip} onClick={onSkip}>
          <Skip className={styles.icon}/>
        </Button>
      </div>
      {results.map(({ item }) => (
        <Track
          key={item.track.id}
          track={item}
          onClick={() => onGuess(item)}
        />
      ))}
    </div>
  );
}
