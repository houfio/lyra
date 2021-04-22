import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';

import { CollectionEntry, TracksResponse } from '../../types';

import { Track } from './Track';
import styles from './Tracks.module.scss';

type Props = {
  tracks: CollectionEntry<TracksResponse>[],
  onClick: (track: CollectionEntry<TracksResponse>) => void
};

export function Tracks({ tracks, onClick }: Props) {
  const fuse = useMemo(() => new Fuse(tracks, {
    keys: ['track.name', 'track.artists.name']
  }), [tracks]);
  const [search, setSearch] = useState('');
  const results = useMemo(() => fuse.search(search, { limit: 3 }), [fuse, search]);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
        placeholder="Enter your guess here..."
      />
      {results.map(({ item }) => (
        <Track
          key={item.track.id}
          track={item}
          onClick={() => onClick(item)}
        />
      ))}
    </div>
  );
}
