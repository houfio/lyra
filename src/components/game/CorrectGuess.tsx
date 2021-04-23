import { CollectionEntry, TracksResponse } from '../../types';
import { Button } from '../forms/Button';

type Props = {
  track: CollectionEntry<TracksResponse>,
  next: boolean,
  onClick: () => void
};

export function CorrectGuess({ track, next, onClick }: Props) {
  return (
    <>
      You guessed it correctly! The song was {track.track.name}
      <Button text="Next" disabled={!next} onClick={onClick}/>
    </>
  );
}
