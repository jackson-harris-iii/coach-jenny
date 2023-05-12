import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { magic } from '../utils/magic';
import { UserContext } from '../utils/UserContext';
import '../styles/globals.css';
import Spinner from '../components/Spinner';

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
    <UserContext.Provider value={[user, setUser]}>
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>
      {user.loading ? <Spinner /> : <Component {...pageProps} />}
    </UserContext.Provider>
  );
};

export default MyApp;
