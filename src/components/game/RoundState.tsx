import { GameState } from '../../types';

import styles from './RoundState.module.scss';

type Props = {
  state: GameState
};

export function RoundState({ state }: Props) {
  return (
    <div className={styles.state}>
      <div className={styles.stat}>
        <span>{state.correct}/{state.total}</span>
        Correct
      </div>
      <div className={styles.stat}>
        <span>{state.score}</span>
        Score
      </div>
    </div>
  );
}
