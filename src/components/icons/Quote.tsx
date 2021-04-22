import { ComponentPropsWithoutRef } from 'react';

export function Quote(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 12" {...props}>
      <path
        stroke="currentColor"
        d="M2.674 10.097L1.13 7.384A1 1 0 011 6.889V2a1 1 0 011-1h3a1 1 0 011 1v4.154a1 1 0 01-1 1h-.388a1 1 0 00-.865 1.502l.358.618a.826.826 0 11-1.431.823zM9.674 10.097L8.13 7.384A1 1 0 018 6.889V2a1 1 0 011-1h3a1 1 0 011 1v4.154a1 1 0 01-1 1h-.388a1 1 0 00-.865 1.502l.358.618a.826.826 0 11-1.431.823z"
      />
    </svg>
  );
}
