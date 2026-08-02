/**
 * "Sign out" in the navbar. Registered as `custom-signOut` — see
 * src/theme/NavbarItem/ComponentTypes.js.
 *
 * Reads the gate context rather than touching Firebase itself, so it calls the
 * exact `signOut` the Root gate owns, against the instance the auth listener is
 * attached to. Doing its own `getFirebase()` would work until it didn't, and
 * the failure mode is silent: sign-out succeeds, the UI never changes.
 *
 * In the local development bypass there is no session, so rather than render a
 * button that can only fail, it says the gate is off. Matters because the dev
 * server otherwise looks exactly like the deployed site.
 */

import React, {useCallback, useState} from 'react';
import {useGate} from '@site/src/lib/gateContext';

export default function SignOutNavbarItem({mobile}) {
  const {mode, email, signOut} = useGate();
  const [busy, setBusy] = useState(false);

  const onClick = useCallback(
    async (event) => {
      event.preventDefault();
      if (busy) return;
      setBusy(true);
      try {
        await signOut();
        // Root's auth listener swaps in the sign-in screen.
      } catch (err) {
        console.error('[docs-gate] sign-out failed', err);
        setBusy(false);
      }
    },
    [signOut, busy],
  );

  if (mode !== 'gated') {
    return (
      <span
        className={mobile ? 'menu__link' : 'navbar__item'}
        style={{opacity: 0.6, cursor: 'default'}}
        title="No Firebase config, so the sign-in gate is skipped. Deployed builds are always gated."
      >
        Gate off (dev)
      </span>
    );
  }

  return (
    <a
      href="#sign-out"
      className={mobile ? 'menu__link' : 'navbar__item navbar__link'}
      onClick={onClick}
      title={email ? `Signed in as ${email}` : 'Sign out'}
    >
      {busy ? 'Signing out…' : 'Sign out'}
    </a>
  );
}
