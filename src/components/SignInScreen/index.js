/**
 * The screen shown until someone is signed in and cleared.
 *
 * Pure and browser-API-free: it's also the server-render fallback, so it must
 * render identically at build time.
 */

import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const MESSAGES = {
  'auth/popup-blocked':
    'Your browser blocked the sign-in popup. Allow popups for this site and try again.',
  'auth/unauthorized-domain':
    'This domain isn’t authorised in Firebase yet. An admin needs to add it under Authentication → Settings → Authorized domains.',
  'auth/network-request-failed':
    'Couldn’t reach Google. Check your connection and try again.',
};

// Closing the popup isn't an error — it's someone changing their mind.
const SILENT = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'];

export default function SignInScreen({status, detail, onSignIn, onSignOut}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // Signing in successfully but being refused leaves this screen mounted — it
  // swaps from "sign in" to "denied" rather than unmounting. Without this the
  // button stays stuck on "Switching…", disabled, with no way forward.
  useEffect(() => {
    setBusy(false);
    setError('');
  }, [status]);

  const handleSignIn = async () => {
    setBusy(true);
    setError('');
    try {
      await onSignIn();
      // On success the auth listener in Root takes over and swaps this out.
    } catch (err) {
      console.error('[docs-gate] sign-in failed', err);
      if (!SILENT.includes(err?.code)) {
        setError(MESSAGES[err?.code] || 'Sign-in failed. Please try again.');
      }
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    setError('');
    try {
      await onSignOut();
    } catch (err) {
      console.error('[docs-gate] sign-out failed', err);
      setError('Couldn’t sign out. Reload the page and try again.');
    }
    setBusy(false);
  };

  const checking = status === 'checking';

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <div className={styles.mark} aria-hidden="true">
          M
        </div>
        <h1 className={styles.title}>MoBros Admin Docs</h1>

        {checking && (
          <>
            <p className={styles.sub} role="status">
              Checking your access…
            </p>
            <div className={styles.spinner} aria-hidden="true" />
          </>
        )}

        {status === 'signed-out' && (
          <>
            <p className={styles.sub}>
              Sign in with the same Google account you use for the dashboard.
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={handleSignIn}
              disabled={busy}
            >
              <GoogleMark />
              <span>{busy ? 'Signing in…' : 'Sign in with Google'}</span>
            </button>
          </>
        )}

        {status === 'denied' && (
          <>
            <p className={`${styles.note} ${styles.noteError}`} role="alert">
              {detail ? (
                <>
                  <strong>{detail}</strong> doesn’t have access to the docs.
                </>
              ) : (
                'That account doesn’t have access to the docs.'
              )}{' '}
              If your access is on another Google account, switch to it below.
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={handleSignOut}
              disabled={busy}
            >
              <span>{busy ? 'Switching…' : 'Try another account'}</span>
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <p className={`${styles.note} ${styles.noteError}`} role="alert">
              {detail || 'Something went wrong checking your access.'}
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={handleSignOut}
              disabled={busy}
            >
              <span>Start over</span>
            </button>
          </>
        )}

        {error && (
          <p className={`${styles.note} ${styles.noteError}`} role="alert">
            {error}
          </p>
        )}

        <p className={styles.foot}>Staff access only.</p>
      </main>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.3z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.9 0 10.9-2 14.5-5.3l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.6-3.9-12.3-9.1H4.3v5.7C7.9 41.1 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.7 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.3A22 22 0 0 0 2 24c0 3.6.9 6.9 2.3 9.9l7.4-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 7.9 6.9 4.3 14.1l7.4 5.7c1.7-5.2 6.6-9.1 12.3-9.1z"
      />
    </svg>
  );
}
