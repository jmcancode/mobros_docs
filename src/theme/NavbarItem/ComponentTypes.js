/**
 * Registers the `custom-signOut` navbar item type used in docusaurus.config.js.
 *
 * A plain link won't do here: signing out is a Firebase call, not a navigation,
 * and there's no URL to point at now that the gate lives in the browser.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import SignOutNavbarItem from '@site/src/components/SignOutNavbarItem';

export default {
  ...ComponentTypes,
  'custom-signOut': SignOutNavbarItem,
};
