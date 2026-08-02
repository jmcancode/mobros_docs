// @ts-check
// MoBros TCG — documentation site
// Docs: https://docusaurus.io/docs

import {themes as prismThemes} from 'prism-react-renderer';
import llmExport from './plugins/llm-export.js';

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
    // `.md` files are parsed as plain CommonMark, `.mdx` as MDX. Without this,
    // Docusaurus treats everything as MDX and chokes on the notification
    // message tokens we quote constantly ({name}, {value}, {remaining}) by
    // reading them as JavaScript expressions.
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Generates /llm/**.md, /llms.txt and /llms-full.txt into static/ so staff
  // can hand any page to an AI assistant. See plugins/llm-export.js.
  plugins: [llmExport],

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
            // Raw HTML rather than a normal nav item: /_gate/signout is served
            // by the edge gate, not by Docusaurus, so the link checker would
            // (correctly) call it broken. An absolute URL would dodge that but
            // hardcode the domain and break on deploy previews.
            //
            // Matters on a shared shop machine — though the session also ends
            // on its own when the browser closes.
            type: 'html',
            position: 'right',
            value:
              '<a class="navbar__item navbar__link" href="/_gate/signout">Sign out</a>',
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
