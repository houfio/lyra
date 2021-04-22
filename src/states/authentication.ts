import { createDakpan } from 'dakpan';

import { clientId, redirectUrl } from '../constants';
import { useNotify } from '../hooks/useNotify';
import { buildQuery } from '../utils/buildQuery';

export const [AuthenticationProvider, useAuthentication] = createDakpan(() => {
  if (!process.browser) {
    return {};
  }

  const accessToken = localStorage.getItem('access_token') ?? undefined;
  const refreshToken = localStorage.getItem('refresh_token') ?? undefined;
  const expiry = parseInt(localStorage.getItem('expiry') ?? '', 10) || undefined;

  return {
    accessToken,
    refreshToken,
    expiry
  };
})({
  login: (notify: ReturnType<typeof useNotify>, token: string, code?: string) => async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      body: buildQuery(code ? {
        client_id: clientId,
        grant_type: 'authorization_code',
        code: token,
        redirect_uri: redirectUrl,
        code_verifier: code
      } : {
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    const data = await response.json();

    if (data.error) {
      localStorage.clear();

      notify('Unable to login to Spotify, please try again');

      return {};
    }

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const expiry = Date.now() + data.expires_in * 1000;

    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('expiry', String(expiry));

    notify(code ? 'Successfully logged in' : 'Successfully refreshed token');

    return {
      accessToken,
      refreshToken,
      expiry
    };
  },
  logout: () => () => {
    localStorage.clear();

    return {};
  }
});
