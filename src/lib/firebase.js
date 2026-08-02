/**
 * Firebase for the docs site — auth and a single Firestore read.
 *
 * Same project and same web config as the admin dashboard, so staff sign in
 * with the account they already use. The config values are public by design
 * (they identify the project, they don't authorise anything); Firestore
 * security rules are what actually protect data.
 *
 * Values come from `customFields` in docusaurus.config.js, which reads them
 * from the environment at build time. They are baked into the bundle, so
 * changing one needs a redeploy.
 *
 * Initialisation is lazy and memoised: Docusaurus server-renders every page at
 * build time, and the Firebase SDK is browser-only.
 */

import {initializeApp, getApps, getApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

let cached = null;

export function getFirebase(config) {
  if (cached) return cached;

  if (typeof window === 'undefined') {
    throw new Error('getFirebase() is browser-only');
  }
  if (!config?.apiKey || !config?.projectId) {
    throw new Error('Firebase config is missing — check the docs site env vars');
  }

  const app = getApps().length ? getApp() : initializeApp(config);
  cached = {app, auth: getAuth(app), db: getFirestore(app)};
  return cached;
}
