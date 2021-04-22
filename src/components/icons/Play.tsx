import { ComponentPropsWithoutRef } from 'react';

export function Play(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 11" {...props}>
      <path stroke="currentColor" d="M7.5 4.634a1 1 0 010 1.732L2.25 9.397a1 1 0 01-1.5-.866V2.47a1 1 0 011.5-.866L7.5 4.634z"/>
    </svg>
  );
}
