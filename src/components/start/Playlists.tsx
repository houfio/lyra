import { CollectionEntry, PlaylistsResponse } from '../../types';
import { Playlist } from '../forms/Playlist';

import styles from './Playlists.module.scss';

type Props = {
  playlists: CollectionEntry<PlaylistsResponse>[]
};

export function Playlists({ playlists }: Props) {
  return (
    <>
      <span className={styles.heading}>
        Playlists
      </span>
      <span className={styles.help}>
        Click on playlists to enable them
      </span>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} name="playlists" playlist={playlist}/>
      ))}
    </>
  );
}
