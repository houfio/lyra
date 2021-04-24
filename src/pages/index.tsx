import { useRouter } from 'next/router';

import { Form } from '../components/forms/Form';
import { Center } from '../components/layout/Center';
import { Column } from '../components/layout/Column';
import { Container } from '../components/layout/Container';
import { Row } from '../components/layout/Row';
import { Spinner } from '../components/Spinner';
import { Playlists } from '../components/start/Playlists';
import { Start } from '../components/start/Start';
import { useAuthGuard } from '../hooks/useAuthGuard';
import { useFetch } from '../hooks/useFetch';
import { PlaylistsResponse } from '../types';
import { buildUrl } from '../utils/buildUrl';

export default function Lyra() {
  const skip = useAuthGuard();
  const [, playlists] = useFetch<PlaylistsResponse>(buildUrl('https://api.spotify.com/v1/me/playlists', { limit: '50' }), skip);
  const { push } = useRouter();

  return (
    <Container>
      {!playlists.data ? (
        <Center>
          <Spinner/>
          Logging in...
        </Center>
      ) : (
        <Form
          values={{
            playlists: [] as string[]
          }}
          onSubmit={(values) => push({
            pathname: '/game',
            query: {
              playlist: values.playlists
            }
          })}
        >
          <Row spaces={{ phone: 1, tablet: 2, laptop: 3 }}>
            <Column sizes={{ phone: 6, tablet: 3 }}>
              <Start playlists={playlists.data.items}/>
            </Column>
            <Column sizes={{ phone: 6, tablet: 3 }}>
              <Playlists playlists={playlists.data.items}/>
            </Column>
          </Row>
        </Form>
      )}
    </Container>
  );
}
