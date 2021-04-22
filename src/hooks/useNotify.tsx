import { useDialoog } from 'dialoog';
import { useCallback } from 'react';

import { Notification } from '../components/Notification';

export function useNotify() {
  const [, { open }] = useDialoog();

  return useCallback((message: string, timeout = 2500) => void open((props) => (
    <Notification message={message} timeout={timeout} {...props}/>
  ), { stack: 'notifications', capture: false }), []);
}
