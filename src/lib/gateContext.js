/**
 * Shared state for the sign-in gate.
 *
 * Root owns the auth listener and publishes what it knows here; the navbar's
 * Sign out item consumes it. That's the point — the alternative (each component
 * calling getFirebase() and signOut() for itself) works right up until the two
 * end up holding different Auth instances, at which point sign-out succeeds and
 * the UI never notices. One owner, one instance, one code path.
 *
 * `mode` distinguishes a real gated session from the local development bypass,
 * so UI can avoid offering controls that can't work.
 */

import {createContext, useContext} from 'react';

export const GateContext = createContext({
  mode: 'bypassed', // 'gated' | 'bypassed'
  email: null,
  signOut: async () => {},
});

export function useGate() {
  return useContext(GateContext);
}
