import { DialoogProps, useDialoog } from 'dialoog';

import { useTimeout } from '../hooks/useTimeout';

import styles from './Notification.module.scss';

type Props = {
  message: string,
  timeout: number
};

export function Notification({ message, timeout, index, open, close, remove }: Props & DialoogProps) {
  const [{ dialogs }] = useDialoog();

  useTimeout(timeout, close, []);

  const total = dialogs.filter((dialog) => dialog.stack === 'notifications').length - 1;

  return (
    <button
      className={styles.notification}
      style={{ bottom: `${(total - index) * 4 + 1}rem` }}
      data-open={open}
      onClick={close}
      onAnimationEnd={() => !open && remove()}
    >
      {message}
    </button>
  );
}
