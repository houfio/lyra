import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthentication } from '../states/authentication';

export function useAuthGuard() {
  const { push } = useRouter();
  const [{ accessToken }] = useAuthentication();
  const skip = !accessToken;

  useEffect(() => {
    if (skip) {
      push('/login');
    }
  }, [skip, push]);

  return skip;
}
