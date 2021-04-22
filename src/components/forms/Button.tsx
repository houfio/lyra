import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { classes } from '../../utils/classes';

import styles from './Button.module.scss';

type Props = {
  as?: keyof JSX.IntrinsicElements,
  text: string
};

export const Button = forwardRef<HTMLButtonElement, Props & ComponentPropsWithoutRef<'button'>>((props, ref) => (
  <button ref={ref} title={props.text} {...props} className={classes(styles.button, props)}>
    {props.children ?? props.text}
  </button>
));
