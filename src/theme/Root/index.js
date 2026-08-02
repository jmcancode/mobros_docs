/**
 * Root wrapper — the sign-in gate for the docs site.
 *
 * Mirrors the admin dashboard's Login.jsx: Google popup sign-in with a forced
 * account chooser, then a read of `users/{uid}` to confirm the account carries
 * the admin flag. Same project, same account, same check — so if the dashboard
 * lets you in, this does too, and revoking one revokes both.
 *
 * ── What this protects, honestly ───────────────────────────────────────────
 * This is a client-side gate on a static site. It stops a casual visitor and
 * means the URL can be shared without handing over the manual. It is NOT a
 * server-side wall.
 *
 * Two things narrow the gap. The whole app renders client-side, so the HTML on
 * the CDN is a near-empty shell — `curl` on a page URL returns the sign-in
 * screen, not the content. And the site doesn't publish plain-text copies of
 * every page; "Copy for AI" builds its text from the rendered DOM instead.
 *
 * What remains: page content is compiled into the JS chunks under /assets/js/,
 * which are publicly fetchable. Closing that needs a check before Netlify
 * serves the file — a metered edge function, deliberately declined.
 *
 * So don't put anything here that would genuinely hurt if it leaked —
 * credentials, customer data, real UIDs. The docs are written on that basis.
 */

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SignInScreen from '@site/src/components/SignInScreen';
import {GateContext} from '@site/src/lib/gateContext';

/**
 * Roles that may read the docs.
 *
 * The admin flag alone, matching the dashboard's login. To let every staff role
 * in — arguably the right bar, since the docs are written for anyone working a
 * shift — add the rest of the staff keys from the dashboard's
 * config/accessMatrix.js: isGM, isShopManager, isAccountant, isFrontHouse,
 * isBackHouse, isStreamManager, isStreamer, isModerator, isEmployee.
 */
const ALLOWED_ROLES = ['isAdmin'];

const STATUS = {
  CHECKING: 'checking',
  ALLOWED: 'allowed',
  SIGNED_OUT: 'signed-out',
  DENIED: 'denied',
  ERROR: 'error',
};

/**
 * Local authoring shouldn't need Firebase credentials, so `npm start` with no
 * config skips the gate.
 *
 * Scoped to development — `npm run build` sets NODE_ENV=production, so a
 * deployed site can never take this path no matter what its environment looks
 * like. A gate that opens when its config is missing is worse than no gate,
 * because everyone assumes it's working.
 */
function isDevBypass(config) {
  return process.env.NODE_ENV === 'development' && !config?.apiKey;
}

function Gate({children}) {
  const {siteConfig} = useDocusaurusContext();
  const config = siteConfig.customFields?.firebase;
  const bypassed = isDevBypass(config);

  const [status, setStatus] = useState(
    bypassed ? STATUS.ALLOWED : STATUS.CHECKING,
  );
  const [detail, setDetail] = useState('');
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (bypassed) {
      console.warn(
        '[docs-gate] development build with no Firebase config — sign-in skipped',
      );
      return undefined;
    }

    let live = true;
    let unsubscribe = () => {};

    (async () => {
      try {
        const [{getFirebase}, {onAuthStateChanged}] = await Promise.all([
          import('@site/src/lib/firebase'),
          import('firebase/auth'),
        ]);
        const firebase = getFirebase(config);

        unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
          if (!live) return;

          if (!user) {
            setEmail(null);
            setStatus(STATUS.SIGNED_OUT);
            return;
          }

          setEmail(user.email || null);
          setStatus(STATUS.CHECKING);

          try {
            const {doc, getDoc} = await import('firebase/firestore');
            const snap = await getDoc(doc(firebase.db, 'users', user.uid));
            const roles = snap.exists() ? snap.data()?.roles || {} : {};

            if (!live) return;

            if (ALLOWED_ROLES.some((role) => roles[role] === true)) {
              setStatus(STATUS.ALLOWED);
              return;
            }

            // Signed in as the wrong account is the most common failure, so
            // name the account rather than just refusing.
            setDetail(user.email || '');
            setStatus(STATUS.DENIED);
          } catch (err) {
            console.error('[docs-gate] role lookup failed', err);
            if (!live) return;
            // Fail closed. A Firestore hiccup must not open the door.
            setDetail(
              err?.code === 'permission-denied'
                ? "Couldn't read your account permissions."
                : "Couldn't check your access.",
            );
            setStatus(STATUS.ERROR);
          }
        });
      } catch (err) {
        console.error('[docs-gate] init failed', err);
        if (!live) return;
        setDetail(
          'Sign-in is not configured for this site. An admin needs to check its environment variables.',
        );
        setStatus(STATUS.ERROR);
      }
    })();

    return () => {
      live = false;
      unsubscribe();
    };
  }, [config, bypassed]);

  const signIn = useCallback(async () => {
    const [{getFirebase}, {GoogleAuthProvider, signInWithPopup}] =
      await Promise.all([
        import('@site/src/lib/firebase'),
        import('firebase/auth'),
      ]);

    // Always show the chooser. Without it the popup silently reuses whichever
    // Google account the browser is already in, and anyone whose access lives
    // on a second account gets refused with no idea why.
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'});

    await signInWithPopup(getFirebase(config).auth, provider);
  }, [config]);

  const signOut = useCallback(async () => {
    // Guard rather than throw: in the dev bypass there's no Firebase to sign
    // out of, and the UI shouldn't be offering the control anyway.
    if (bypassed) {
      console.warn('[docs-gate] sign-out ignored — gate is bypassed');
      return;
    }
    const [{getFirebase}, {signOut: fbSignOut}] = await Promise.all([
      import('@site/src/lib/firebase'),
      import('firebase/auth'),
    ]);
    await fbSignOut(getFirebase(config).auth);
    // The auth listener above swaps in the sign-in screen.
  }, [config, bypassed]);

  const gate = useMemo(
    () => ({mode: bypassed ? 'bypassed' : 'gated', email, signOut}),
    [bypassed, email, signOut],
  );

  return (
    <GateContext.Provider value={gate}>
      {status === STATUS.ALLOWED ? (
        children
      ) : (
        <SignInScreen
          status={status}
          detail={detail}
          onSignIn={signIn}
          onSignOut={signOut}
        />
      )}
    </GateContext.Provider>
  );
}

export default function Root({children}) {
  return (
    <BrowserOnly
      // Render nothing server-side. The pre-rendered HTML is what an
      // unauthenticated reader can reach, so it should hold the sign-in screen
      // and not a copy of the page.
      fallback={<SignInScreen status={STATUS.CHECKING} />}
    >
      {() => <Gate>{children}</Gate>}
    </BrowserOnly>
  );
}
