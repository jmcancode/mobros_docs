// @ts-check

/**
 * Two sidebars, two audiences.
 *
 *   staffSidebar     — everyone who works a shift: operators, managers, owners.
 *   developerSidebar — anyone who has to build, deploy, or debug the thing.
 *
 * Shared reference pages hang off the end of both.
 *
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const referenceCategory = {
  type: 'category',
  label: 'Reference',
  items: [
    'reference/glossary',
    'reference/statuses',
    'reference/role-matrix',
  ],
};

const sidebars = {
  staffSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting started',
      collapsed: false,
      items: [
        'getting-started/signing-in',
        'getting-started/navigating',
        'getting-started/what-you-can-see',
        'getting-started/locked-features',
        'getting-started/ask-an-ai',
      ],
    },
    {
      type: 'category',
      label: 'Daily operations',
      items: [
        'operations/dashboard',
        'operations/professor-oak',
        'operations/sell-requests',
        'operations/tickets',
        'operations/automations',
        'operations/intake-processing',
        'operations/shipping',
      ],
    },
    {
      type: 'category',
      label: 'Catalog & pricing',
      items: [
        'catalog/reprice',
        'catalog/product-pricing',
        'catalog/variants-sku-qr',
        'catalog/buy-rates',
        'catalog/condition-multipliers',
        'catalog/add-product',
        'catalog/feed-studio',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/customers',
        'community/customer-detail',
        'community/rewards',
        'community/bags',
        'community/games',
        'community/giveaways',
      ],
    },
    {
      type: 'category',
      label: 'Content & marketing',
      items: [
        'content/notifications',
        'content/marketing',
        'content/promotions',
        'content/live-breaks',
        'content/hit-feed',
        'content/shows',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'administration/roles-and-access',
        'administration/pricing-rules',
        'administration/integrations',
        'administration/sessions',
        'administration/claude-access',
        'administration/billing',
      ],
    },
    referenceCategory,
  ],

  developerSidebar: [
    'developers/index',
    {
      type: 'category',
      label: 'Foundations',
      collapsed: false,
      items: [
        'developers/architecture',
        'developers/local-setup',
        'developers/environment-variables',
      ],
    },
    {
      type: 'category',
      label: 'Data & access',
      items: [
        'developers/firestore-collections',
        'developers/api-reference',
        'developers/access-control',
      ],
    },
    {
      type: 'category',
      label: 'Shipping it',
      items: [
        'developers/deploying',
        'developers/editing-these-docs',
      ],
    },
    referenceCategory,
  ],
};

export default sidebars;
