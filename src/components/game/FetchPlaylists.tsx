import { useEffect, useState } from 'react';

import { CollectionEntry, TracksResponse } from '../../types';

import { FetchTracks } from './FetchTracks';

type Props = {
  playlists: string | string[],
  onFetch: (tracks: CollectionEntry<TracksResponse>[]) => void
};

export function FetchPlaylists({ playlists, onFetch }: Props) {
  const [loading, setLoading] = useState(Array.isArray(playlists) ? playlists : [playlists]);
  const [tracks, setTracks] = useState<CollectionEntry<TracksResponse>[]>([]);

  useEffect(() => {
    if (loading.length) {
      return;
    }

    onFetch(tracks.filter((track, i) => tracks
      .findIndex((t) => t.track.id === track.track.id) === i));
  }, [loading, tracks, onFetch]);

  return (
    <>
      {loading.map((id) => (
        <div key={id}>
          <FetchTracks
            id={id}
            onFetch={(t) => {
              setLoading(loading.filter((l) => l !== id));
              setTracks([
                ...tracks,
                ...t
              ]);
            }}
          />
        </div>
      ))}
    </>
  );
}
