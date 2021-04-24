import { ComponentPropsWithoutRef, createElement } from 'react';

import { classes } from '../utils/classes';

import styles from './Card.module.scss';
import { Cover } from './icons/Cover';

type Props<T> = {
  title: string,
  subtitle?: string,
  cover?: string,
  big?: boolean,
  as?: T
};

export function Card<T extends keyof JSX.IntrinsicElements = 'div'>({ title, subtitle, cover, big = false, as, ...props }: Props<T> & ComponentPropsWithoutRef<T>) {
  return createElement(as ?? 'div', {
    ...props,
    className: classes(styles.card, props),
    'data-big': big,
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
