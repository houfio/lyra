import { ComponentPropsWithoutRef } from 'react';

import { classes } from '../../utils/classes';

import styles from './Row.module.scss';

type Props = {
  spaces?: Record<string, number>
};

export function Row({ spaces, ...props }: Props & ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...spaces && Object.entries(spaces).reduce((acc, [key, value]) => ({
        ...acc,
        [`data-${key}`]: value
      }), {})}
      {...props}
      className={classes(styles.row, props)}
    />
  );
}
