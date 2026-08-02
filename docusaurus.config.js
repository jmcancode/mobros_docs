// @ts-check
// MoBros TCG — documentation site
// Docs: https://docusaurus.io/docs

import {themes as prismThemes} from 'prism-react-renderer';

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
        sitemap: {
          // `lastmod` is intentionally off: it reads git commit dates, which
          // breaks the build outside a git worktree. Turn it on alongside
          // `showLastUpdateTime` once this folder is committed.
          changefreq: 'weekly',
          priority: 0.5,
        },
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
