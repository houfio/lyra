import { ComponentPropsWithoutRef, createElement } from 'react';

import { classes } from '../utils/classes';

import styles from './Card.module.scss';
import { Cover } from './icons/Cover';

type Props<T> = {
  title: string,
  subtitle?: string,
  cover?: string,
  as?: T
};

export function Card<T extends keyof JSX.IntrinsicElements = 'div'>({ title, subtitle, cover, as, ...props }: Props<T> & ComponentPropsWithoutRef<T>) {
  return createElement(as ?? 'div', {
    ...props,
    className: classes(styles.card, props),
    children: (
      <>
        {cover ? (
          <img src={cover} className={styles.cover}/>
        ) : (
          <Cover className={styles.cover}/>
        )}
        <div className={styles.details}>
          {title}
          <span>
            {subtitle}
          </span>
        </div>
      </>
    )
  });
}
