import { useFetch } from '../../hooks/useFetch';
import { useNotify } from '../../hooks/useNotify';
import { CollectionEntry, TracksResponse } from '../../types';
import { Card } from '../Card';
import { Button } from '../forms/Button';
import { Play } from '../icons/Play';

import styles from './CorrectGuess.module.scss';

type Props = {
  track: CollectionEntry<TracksResponse>,
  next: boolean,
  onClick: () => void
};

export function CorrectGuess({ track, next, onClick }: Props) {
  const [execute] = useFetch('https://api.spotify.com/v1/me/player/play');
  const notify = useNotify();

  return (
    <div className={styles.wrapper}>
      <div className={styles.play}>
        <Card
          title={track.track.name}
          subtitle={track.track.artists[0].name}
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
      <Button text="Next song" loading={!next} onClick={onClick}/>
    </div>
  );
}
