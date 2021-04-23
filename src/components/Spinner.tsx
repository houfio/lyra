import { ComponentPropsWithoutRef } from 'react';

import { classes } from '../utils/classes';

import styles from './Spinner.module.scss';

export function Spinner(props: ComponentPropsWithoutRef<'div'>) {
  return (
    <div {...props} className={classes(styles.spinner, props)}/>
  );
}
