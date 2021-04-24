import { ComponentPropsWithoutRef } from 'react';

import { classes } from '../../utils/classes';

import styles from './Center.module.scss';

export function Center(props: ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={classes(styles.center, props)}/>
  );
}
