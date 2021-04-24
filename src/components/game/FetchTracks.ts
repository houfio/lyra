import { useEffect, useRef, useState } from 'react';

import { useFetch } from '../../hooks/useFetch';
import { CollectionEntry, TracksResponse } from '../../types';
import { buildUrl } from '../../utils/buildUrl';

type Props = {
  id: string,
  onFetch: (tracks: CollectionEntry<TracksResponse>[]) => void
};

export function FetchTracks({ id, onFetch }: Props) {
  const tracks = useRef<CollectionEntry<TracksResponse>[]>([]);
  const [offset, setOffset] = useState(0);
  const [, { data }] = useFetch<TracksResponse>(buildUrl(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
    offset: String(offset),
    limit: '100',
    fields: 'next,items(track(id,name,preview_url,album(images),artists(name)))'
  }), false);

  useEffect(() => {
    if (!data) {
      return;
    }

    tracks.current = [
      ...tracks.current,
      ...data.items
    ];

    if (data.next) {
      setOffset((o) => o + 100);
    } else {
      onFetch(tracks.current);
    }
  }, [data, setOffset, onFetch]);

  return null;
}
