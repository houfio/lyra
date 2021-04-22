import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuthentication } from '../states/authentication';

import { Button } from './forms/Button';
import { Logo } from './icons/Logo';
import { Container } from './layout/Container';
import styles from './Navigation.module.scss';

export function Navigation() {
  const { pathname } = useRouter();
  const [, { logout }] = useAuthentication();

  return (
    <nav className={styles.navigation}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <Logo className={styles.logo}/>
        </div>
        {pathname === '/game' && (
          <Link href="/">
            <Button as="a" className={styles.link} text="Stop"/>
          </Link>
        )}
        {pathname !== '/login' && (
          <Button text="Logout" onClick={logout}/>
        )}
      </Container>
    </nav>
  );
}
