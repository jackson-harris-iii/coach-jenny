import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { magic } from '../utils/magic';
import { UserContext } from '../utils/UserContext';
import Spinner from '../components/Spinner';
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
import { CssBaseline } from '@mui/material';
import theme from '../utils/theme';

export const metadata = {
  title: 'Jenny v1',
  description: 'A place to learn and grow',
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
const MyApp: React.FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  const [user, setUser] = useState([] as any);
  const router = useRouter();

  useEffect(() => {
    if (!magic) return console.error('Magic not initialized');

    setUser({ loading: true });
    // Check if the user is authenticated already
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn && magic) {
        magic.user.getMetadata().then((userData) => setUser(userData));
        router.push('/dashboard');
      } else {
        router.push('/');
        setUser({ user: null });
      }
    });
  }, []);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <UserContext.Provider value={[user, setUser]}>
          {user.loading ? <Spinner /> : <Component {...pageProps} />}
        </UserContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
