import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Button } from '../components/forms/Button';
import { Container } from '../components/layout/Container';
import { Spinner } from '../components/Spinner';
import { clientId, redirectUrl } from '../constants';
import { useNotify } from '../hooks/useNotify';
import { useAuthentication } from '../states/authentication';
import { buildUrl } from '../utils/buildUrl';
import { encodeCode } from '../utils/encodeCode';
import { generateCode } from '../utils/generateCode';

export default function Login() {
  const { push, query: { code, error } } = useRouter();
  const notify = useNotify();
  const [, { login }] = useAuthentication();

  useEffect(() => {
    if (!code && !error) {
      return;
    }

    login(notify, code as string, sessionStorage.getItem('code') ?? '')
      .then(() => push('/'));
  }, [code, error, login, notify, push]);

  const onClick = async () => {
    const generated = generateCode();

    sessionStorage.setItem('code', generated);

    location.href = buildUrl('https://accounts.spotify.com/authorize', {
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUrl,
      code_challenge_method: 'S256',
      code_challenge: await encodeCode(generated),
      scope: 'playlist-read-private'
    });
  };

  return (
    <Container>
      {code || error ? (
        <Spinner/>
      ) : (
        <Button text="Login" onClick={onClick}/>
      )}
    </Container>
  );
}
