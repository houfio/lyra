import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { FetchPlaylists } from '../components/game/FetchPlaylists';
import { GuessTrack } from '../components/game/GuessTrack';
import { Lyric } from '../components/game/Lyric';
import { RoundResult } from '../components/game/RoundResult';
import { RoundState } from '../components/game/RoundState';
import { Center } from '../components/layout/Center';
import { Container } from '../components/layout/Container';
import { Spinner } from '../components/Spinner';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useFetch } from '../hooks/useFetch';
import { useNotify } from '../hooks/useNotify';
import { CollectionEntry, GameState, LyricResponse, TracksResponse } from '../types';
import { buildUrl } from '../utils/buildUrl';
import { geniusify } from '../utils/geniusify';

export default function Game() {
  const skip = useAuthGuard();
  const notify = useNotify();
  const randomizeRef = useRef<(skipped?: boolean) => void>();
  const { query: { playlist } } = useRouter();
  const [tracks, setTracks] = useState<CollectionEntry<TracksResponse>[]>([]);
  const [track, setTrack] = useState<CollectionEntry<TracksResponse>>();
  const [last, setLast] = useState<{ skipped: boolean, track: CollectionEntry<TracksResponse> }>();
  const [reload, setReload] = useState(0);
  const [state, setState] = useState<GameState>({ total: 0, correct: 0, score: 0 })
  const [, { data, loading }] = useFetch<LyricResponse>(buildUrl('/api', !track ? {} : {
    artist: geniusify(track.track.artists.map((a) => a.name)),
    track: geniusify(track.track.name)
  }), skip || !track);

  randomizeRef.current = (skipped) => {
    if (skipped !== undefined && track) {
      setState({
        total: state.total + 1,
        correct: state.correct + (skipped ? 0 : 1),
        score: state.score + (skipped ? 0 : Math.max(1, 5 - reload))
      });
      setLast({ skipped, track });
      setReload(0);
    }

    let nextTrack = track;

    while (nextTrack === track) {
      nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    }

    setTrack(nextTrack);
  };

  useEffect(() => {
    if (tracks.length) {
      randomizeRef.current?.();
    }
  }, [tracks]);

  useEffect(() => {
    if (data?.success === false) {
      randomizeRef.current?.();
    }
  }, [data]);

  return !playlist ? null : (
    <Container>
      {last ? (
        <Center>
          <RoundResult
            track={last.track}
            skipped={last.skipped}
            next={!loading}
            onClick={() => setLast(undefined)}
          />
          <RoundState state={state}/>
        </Center>
      ) : !tracks.length || !data || !data.success || !track ? (
        <Center>
          <Spinner/>
          {!tracks.length ? (
            <>
              <FetchPlaylists playlists={playlist} onFetch={setTracks}/>
              Loading tracks...
            </>
          ) : (
            <>
              Loading lyrics...
            </>
          )}
        </Center>
      ) : (
        <>
          <Lyric reload={reload} track={track} lyrics={data.data}/>
          <GuessTrack
            tracks={tracks}
            onGuess={(guess) => {
              if (guess !== track) {
                return notify('Incorrect guess');
              }

              randomizeRef.current?.(false);
            }}
            onReload={() => setReload(reload + 1)}
            onSkip={() => randomizeRef.current?.(true)}
          />
        </>
      )}
    </Container>
  );
}
