import { HTMLAttributes } from 'react';

export function classes(cls: string, props: HTMLAttributes<unknown>) {
  return `${cls}${props.className ? ` ${props.className}` : ''}`;
}
