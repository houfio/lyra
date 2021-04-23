import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { classes } from '../../utils/classes';
import { Spinner } from '../Spinner';

import styles from './Button.module.scss';

type Props = {
  as?: keyof JSX.IntrinsicElements,
  text: string,
  loading?: boolean
};

export const Button = forwardRef<HTMLButtonElement, Props & ComponentPropsWithoutRef<'button'>>(({ loading, ...props }, ref) => (
  <button ref={ref} title={props.text} {...props} disabled={props.disabled || loading} className={classes(styles.button, props)}>
    <div className={styles.content} data-loading={loading}>
      {props.children ?? props.text}
    </div>
    {loading && (
      <Spinner className={styles.spinner}/>
    )}
  </button>
));
