import { useCallback, useEffect, useState } from 'react';

import { useAuthentication } from '../states/authentication';

import { useNotify } from './useNotify';

export function useFetch<T>(url: string, skip = false) {
  const notify = useNotify();
  const [{ accessToken, refreshToken, expiry }, { login, logout }] = useAuthentication();
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const execute = useCallback(async (payload?: any) => {
    if (!accessToken || !refreshToken || !expiry) {
      return;
    }

    setLoading(true);

    if (expiry - Date.now() < 60000) {
      await login(notify, refreshToken);

      return;
    }

    const response = await fetch(url, {
      method: payload ? 'post' : 'get',
      body: JSON.stringify(payload),
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      await logout();
    }

    setLoading(false);
    setData(await response.json());
  }, [url, accessToken, expiry, login, logout, notify, setData, setLoading]);

  useEffect(() => {
    if (!skip) {
      execute();
    }
  }, [skip, execute]);

  return [execute, { data, loading }] as const;
}
