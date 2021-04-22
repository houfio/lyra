import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { FetchTracks } from '../components/game/FetchTracks';
import { Lyric } from '../components/game/Lyric';
import { Tracks } from '../components/game/Tracks';
import { Container } from '../components/layout/Container';
import { Spinner } from '../components/Spinner';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useFetch } from '../hooks/useFetch';
import { useNotify } from '../hooks/useNotify';
import { CollectionEntry, LyricResponse, TracksResponse } from '../types';
import { buildUrl } from '../utils/buildUrl';
import { geniusify } from '../utils/geniusify';

export default function Game() {
  const skip = useAuthGuard();
  const notify = useNotify();
  const randomizeRef = useRef<() => void>();
  const { query: { playlist } } = useRouter();
  const [loading, setLoading] = useState<string[]>([]);
  const [tracks, setTracks] = useState<CollectionEntry<TracksResponse>[]>([]);
  const [track, setTrack] = useState<CollectionEntry<TracksResponse>>();
  const [, { data, loading: dataLoading }] = useFetch<LyricResponse>(buildUrl('/api', !track ? {} : {
    artist: geniusify(track.track.artists[0].name),
    track: geniusify(track.track.name)
  }), skip || !track);

  randomizeRef.current = () => setTrack(tracks[Math.floor(Math.random() * tracks.length)]);

  useEffect(() => {
    if (skip || !playlist || tracks.length) {
      return;
    }

    setLoading(Array.isArray(playlist) ? playlist : [playlist]);
  }, [skip, playlist, tracks, setLoading]);

  useEffect(() => {
    if (loading.length) {
      return;
    }

    randomizeRef.current?.();
  }, [loading]);

  useEffect(() => {
    if (data?.success === false) {
      randomizeRef.current?.();
    }
  }, [data]);

  return (
    <Container>
      {!loading.length && !tracks.length ? (
        <Spinner/>
      ) : loading.length ? (
        <>
          <Spinner/>
          {loading.map((id) => (
            <div key={id}>
              <FetchTracks
                id={id}
                onFetch={(t) => {
                  setLoading((value) => value.filter((l) => l !== id));
                  setTracks((value) => [
                    ...value,
                    ...t
                  ]);
                }}
              />
            </div>
          ))}
        </>
      ) : !data || !data.success || !track || dataLoading ? (
        <Spinner/>
      ) : (
        <>
          <Lyric track={track} lyrics={data.data}/>
          <Tracks
            tracks={tracks}
            onClick={(guess) => {
              if (guess !== track) {
                return notify('Incorrect guess');
              }

              randomizeRef.current?.();
            }}
          />
        </>
      )}
    </Container>
  );
}
