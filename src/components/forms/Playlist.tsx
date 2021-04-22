import { useFormContext } from 'react-hook-form';

import { CollectionEntry, PlaylistsResponse } from '../../types';
import { Card } from '../Card';

import styles from './Playlist.module.scss';

type Props = {
  name: string,
  playlist: CollectionEntry<PlaylistsResponse>
};

export function Playlist({ name, playlist }: Props) {
  const { register } = useFormContext();

  return (
    <div className={styles.playlist}>
      <input className={styles.input} id={playlist.id} value={playlist.id} type="checkbox" {...register(name)}/>
      <Card
        title={playlist.name}
        subtitle={`${playlist.tracks.total} tracks`}
        cover={playlist.images[0]?.url}
        as="label"
        htmlFor={playlist.id}
      />
    </div>
  );
}
