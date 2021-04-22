import { ComponentPropsWithoutRef, createElement } from 'react';

import { classes } from '../../utils/classes';

import styles from './Container.module.scss';

type Props<T> = {
  as?: T
};

export function Container<T extends keyof JSX.IntrinsicElements = 'div'>({ as, ...props }: Props<T> & ComponentPropsWithoutRef<T>) {
  return createElement(as ?? 'div', {
    ...props,
    className: classes(styles.container, props)
  });
}
