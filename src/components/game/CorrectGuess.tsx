import { CollectionEntry, TracksResponse } from '../../types';
import { Card } from '../Card';
import { Button } from '../forms/Button';

import styles from './CorrectGuess.module.scss';

type Props = {
  track: CollectionEntry<TracksResponse>,
  next: boolean,
  onClick: () => void
};

export function CorrectGuess({ track, next, onClick }: Props) {
  return (
    <div className={styles.wrapper}>
      <Card
        title={track.track.name}
        subtitle={track.track.artists[0].name}
        cover={track.track.album.images[0].url}
        big={true}
      />
      <Button text="Next song" loading={!next} onClick={onClick}/>
    </div>
  );
}
