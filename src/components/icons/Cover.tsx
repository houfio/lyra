import { ComponentPropsWithoutRef } from 'react';

export function Cover(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" {...props}>
      <path fill="var(--gray-300)" d="M0 0h20v20H0z"/>
      <circle stroke="var(--gray-500)" cx="8" cy="14" r="2.5"/>
      <path stroke="var(--gray-500)" d="M10.5 3v11M10.354 2.646l4 4"/>
    </svg>
  );
}
