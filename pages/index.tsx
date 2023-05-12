import Link from 'next/link';
import { useRouter } from 'next/router';
import { magic } from '../utils/magic';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';

export default function Page() {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Log in using our email with Magic and store the returned DID token in a variable
    try {
      if (!magic) return console.error('Magic not initialized');

      const didToken = await magic.auth.loginWithMagicLink({
        email,
      });

      // Send this token to our validation endpoint
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${didToken}`,
        },
      });

      // If successful, update our user state with their metadata and route to the dashboard
      if (res.ok) {
        const userMetadata = await magic.user.getMetadata();
        setUser(userMetadata);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 mt-72">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Hi I'm Jenny
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Learn in your free time. I build bootcamps to teach you anything with
          the time you have.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          {isSigningIn ? (
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center"
            >
              <label className="block text-center">
                <span className="text-xs font-semibold inline-block last:mr-0 mr-1">
                  Enter Email Address
                </span>
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-center mt-4">
                <button
                  className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 px-4 py-2 rounded"
                  type="submit"
                >
                  Send Magic Link
                </button>
              </div>
            </form>
          ) : (
            <>
              <button
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                onClick={() => setIsSigningIn(!isSigningIn)}
              >
                Sign in
                <svg
                  aria-hidden="true"
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
