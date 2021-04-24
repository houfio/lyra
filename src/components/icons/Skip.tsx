import { ComponentPropsWithoutRef } from 'react';

export function Skip(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" {...props}>
      <path stroke="currentColor" d="M1 1l3.374 3.795a1 1 0 01-.04 1.372L1 9.5M5 1l3.374 3.795a1 1 0 01-.04 1.372L5 9.5"/>
    </svg>
  );
}
