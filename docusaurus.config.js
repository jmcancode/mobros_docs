// @ts-check
// MoBros TCG — documentation site
// Docs: https://docusaurus.io/docs

import {themes as prismThemes} from 'prism-react-renderer';
import 'dotenv/config';

/**
 * Firebase web config for the sign-in gate.
 *
 * Two naming schemes are accepted. `VITE_*` is what the rest of this repo uses
 * (the dashboard is a Vite app), so a `.env` copied from there works unchanged;
 * `DOCS_*` is available when you'd rather be explicit about which site a
 * variable belongs to. Locally these come from `web/docs-site/.env` via dotenv,
 * which is gitignored. In production they come from Netlify's environment.
 *
 * All three values are public by design — they identify the Firebase project
 * rather than authorising anything, and they ship in the bundle either way.
 * Firestore security rules are what actually protect data.
 */
const firebaseConfig = {
  apiKey: process.env.DOCS_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
  authDomain:
    process.env.DOCS_FIREBASE_AUTH_DOMAIN ||
    process.env.VITE_FIREBASE_AUTH_DOMAIN ||
    process.env.VITE_AUTH_DOMAIN,
  projectId:
    process.env.DOCS_FIREBASE_PROJECT_ID ||
    process.env.VITE_FIREBASE_PROJECT_ID ||
    process.env.VITE_PROJECT_ID,
};

// A production build with no config would render the gate's error state for
// every visitor. Fail the build instead — it's a far cheaper place to find out.
if (process.env.NODE_ENV === 'production' && !firebaseConfig.apiKey) {
  throw new Error(
    'Firebase config missing. Set VITE_FIREBASE_API_KEY, VITE_AUTH_DOMAIN and ' +
      'VITE_PROJECT_ID (or the DOCS_FIREBASE_* equivalents) in the environment ' +
      'or in web/docs-site/.env. See docs/developers/deploying.md.',
  );
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MoBros Admin Docs',
  tagline: 'How to run the shop from the Command Center',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  // Production URL. Netlify serves this at the apex domain.
  url: 'https://mobrostc.info',
  baseUrl: '/',

  organizationName: 'mobros',
  projectName: 'mobros-docs',

  // Private site — everything sits behind the staff sign-in gate in
  // netlify/edge-functions/gate.ts. `noIndex` adds a robots meta tag to every
  // page; the gate and netlify.toml add the matching header. A crawler can't
  // reach these pages anyway, but saying so costs nothing.
  noIndex: true,

  // A docs site that lies is worse than no docs site — fail the build on
  // broken links rather than shipping them.
  onBrokenLinks: 'throw',

  markdown: {
    // Left as MDX (the default) on purpose. CommonMark mode looks tempting —
    // it stops MDX reading the notification tokens we quote constantly
    // (`{name}`, `{value}`, `{remaining}`) as JavaScript — but Docusaurus's
    // admonition plugin doesn't run there, so every ::: callout silently
    // renders as literal text. The callouts carry the warnings that matter
    // most, so MDX wins and the tokens are wrapped in backticks instead.
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Baked into the bundle at build time, so changing one needs a redeploy.
  customFields: {firebase: firebaseConfig},

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Docs are the whole site — no /docs prefix.
          routeBasePath: '/',
          // Set this once the docs site is pushed to GitHub and the
          // "Edit this page" links start working.
          editUrl: undefined,
          // Reads the last commit date per file, so it only works once this
          // folder is inside a git repo. Flip to `true` after the first commit
          // (Netlify clones the repo, so it works there immediately).
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        // No sitemap: the site is private, so a machine-readable index of
        // every page would be all downside.
        sitemap: false,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'MoBros Admin Docs',
        logo: {
          alt: 'MoBros',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'staffSidebar',
            position: 'left',
            label: 'Staff guide',
          },
          {
            type: 'docSidebar',
            sidebarId: 'developerSidebar',
            position: 'left',
            label: 'Developers',
          },
          {
            to: '/reference/glossary',
            position: 'left',
            label: 'Reference',
          },
          {
            href: 'https://admin.mobrostc.info',
            label: 'Open the dashboard',
            position: 'right',
          },
          {
            type: 'custom-signOut',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Staff guide',
            items: [
              {label: 'Start here', to: '/'},
              {label: 'Signing in', to: '/getting-started/signing-in'},
              {label: 'Sell Requests', to: '/operations/sell-requests'},
              {label: 'Product Pricing', to: '/catalog/product-pricing'},
            ],
          },
          {
            title: 'Developers',
            items: [
              {label: 'Architecture', to: '/developers/architecture'},
              {label: 'Local setup', to: '/developers/local-setup'},
              {label: 'Firestore collections', to: '/developers/firestore-collections'},
              {label: 'Deploying', to: '/developers/deploying'},
            ],
          },
          {
            title: 'Reference',
            items: [
              {label: 'Glossary', to: '/reference/glossary'},
              {label: 'Status reference', to: '/reference/statuses'},
              {label: 'Who can see what', to: '/reference/role-matrix'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} MoBros TCG. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'jsx'],
      },
    }),
};

export default config;
