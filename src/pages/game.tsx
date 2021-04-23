import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { Button } from '../components/forms/Button';
import { FetchPlaylists } from '../components/game/FetchPlaylists';
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
import { CorrectGuess } from '../components/game/CorrectGuess';

export default function Game() {
  const skip = useAuthGuard();
  const notify = useNotify();
  const randomizeRef = useRef<(correct: boolean) => void>();
  const { query: { playlist } } = useRouter();
  const [tracks, setTracks] = useState<CollectionEntry<TracksResponse>[]>([]);
  const [track, setTrack] = useState<CollectionEntry<TracksResponse>>();
  const [guessed, setGuessed] = useState<CollectionEntry<TracksResponse>>();
  const [, { data, loading }] = useFetch<LyricResponse>(buildUrl('/api', !track ? {} : {
    artist: geniusify(track.track.artists.map((a) => a.name)),
    track: geniusify(track.track.name)
  }), skip || !track);

  randomizeRef.current = (correct) => {
    setGuessed(correct ? track : undefined);

    let nextTrack = track;

    while (nextTrack === track) {
      nextTrack = tracks[Math.floor(Math.random() * tracks.length)]
    }

    setTrack(nextTrack);
  };

  useEffect(() => {
    if (tracks.length) {
      randomizeRef.current?.(false);
    }
  }, [tracks]);

  useEffect(() => {
    if (data?.success === false) {
      randomizeRef.current?.(false);
    }
  }, [data]);

  return !playlist ? null : (
    <Container>
      {!tracks.length ? (
        <FetchPlaylists playlists={playlist} onFetch={setTracks}/>
      ) : !data || !data.success || !track ? (
        <Spinner/>
      ) : guessed ? (
        <CorrectGuess track={guessed} next={!loading} onClick={() => setGuessed(undefined)}/>
      ) : (
        <>
          <Lyric track={track} lyrics={data.data}/>
          <Tracks
            tracks={tracks}
            onClick={(guess) => {
              if (guess !== track) {
                return notify('Incorrect guess');
              }

              randomizeRef.current?.(true);
            }}
          />
        </>
      )}
    </Container>
  );
}
