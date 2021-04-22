import { Dialoog, DialoogProvider } from 'dialoog';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Navigation } from '../components/Navigation';
import { AuthenticationProvider } from '../states/authentication';

import './_app.scss';

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Lyra / Guess your songs</title>
      </Head>
      <DialoogProvider>
        <AuthenticationProvider>
          <Navigation/>
          <Component/>
          <Dialoog/>
        </AuthenticationProvider>
      </DialoogProvider>
    </>
  );
}
