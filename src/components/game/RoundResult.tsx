import { useFetch } from '../../hooks/useFetch';
import { useNotify } from '../../hooks/useNotify';
import { CollectionEntry, TracksResponse } from '../../types';
import { Card } from '../Card';
import { Button } from '../forms/Button';
import { Play } from '../icons/Play';

import styles from './RoundResult.module.scss';

type Props = {
  track: CollectionEntry<TracksResponse>,
  skipped: boolean,
  next: boolean,
  onClick: () => void
};

export function RoundResult({ track, skipped, next, onClick }: Props) {
  const [execute] = useFetch('https://api.spotify.com/v1/me/player/play');
  const notify = useNotify();

  const artists = track.track.artists.map((a) => a.name).join(', ');

  return (
    <>
      <div className={styles.play}>
        <Card
          title={track.track.name}
          subtitle={artists}
          cover={track.track.album.images[0].url}
          big={true}
          as="button"
          className={styles.track}
          onClick={() => {
            execute({
              uris: [track.track.uri]
            }).then(() => notify('Playing song on Spotify'))
          }}
        />
        <Play className={styles.icon}/>
      </div>
      <div className={styles.subtitle}>
        {skipped ? 'Better luck next time!' : 'You guessed it correctly!'}
      </div>
      <Button text="Next song" loading={!next} onClick={onClick}/>
    </>
  );
}
