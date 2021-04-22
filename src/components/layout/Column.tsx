import { ComponentPropsWithoutRef } from 'react';

import { classes } from '../../utils/classes';

import styles from './Column.module.scss';

type Props = {
  sizes: Record<string, number>
};

export function Column({ sizes, ...props }: Props & ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...Object.entries(sizes).reduce((acc, [key, value]) => ({
        ...acc,
        [`data-${key}`]: value
      }), {})}
      {...props}
      className={classes(styles.column, props)}
    />
  );
}
