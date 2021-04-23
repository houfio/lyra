import Link from 'next/link';

import { CollectionEntry, TracksResponse } from '../../types';
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
      <img className={styles.cover} src={track.track.album.images[0].url}/>
      <div className={styles.name}>
        {track.track.name}
      </div>
      <div className={styles.artist}>
        {track.track.artists[0].name}
      </div>
      <div className={styles.actions}>
        <Link href="/" passHref={true}>
          <Button as="a" className={styles.link} text="Stop"/>
        </Link>
        <Button text="Next" loading={!next} onClick={onClick}/>
      </div>
    </div>
  );
}
