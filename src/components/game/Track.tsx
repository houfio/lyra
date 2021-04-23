import { CollectionEntry, TracksResponse } from '../../types';
import { Card } from '../Card';

import styles from './Track.module.scss';

type Props = {
  track: CollectionEntry<TracksResponse>,
  onClick: () => void
};

export function Track({ track, onClick }: Props) {
  return (
    <Card
      title={track.track.name}
      subtitle={track.track.artists[0].name}
      cover={track.track.album.images[0]?.url}
      className={styles.track}
      as="button"
      onClick={onClick}
    />
  );
}
