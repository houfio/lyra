import { useFormContext } from 'react-hook-form';

import { CollectionEntry, PlaylistsResponse } from '../../types';
import { Button } from '../forms/Button';
import { Play } from '../icons/Play';

import styles from './Start.module.scss';

type Props = {
  playlists: CollectionEntry<PlaylistsResponse>[]
};

export function Start({ playlists }: Props) {
  const { watch } = useFormContext<{ playlists: string[] }>();
  const { playlists: playlistIds } = watch();

  const filtered = playlistIds.map((id) => playlists.find((p) => p.id === id)!).filter(Boolean);
  const total = filtered.reduce((acc, p) => acc + p.tracks.total, 0);

  return (
    <div className={styles.wrapper}>
      <Button className={styles.start} type="submit" text="Submit" disabled={!total}>
        <Play className={styles.icon}/>
      </Button>
      Start game with {total} tracks
    </div>
  );
}
