/**
 * Wraps the default doc content to put the "Copy for AI" button above the
 * page title. Swizzled as a wrapper, not an ejection, so Docusaurus upgrades
 * keep working — we render the original component untouched.
 */

import React from 'react';
import Content from '@theme-original/DocItem/Content';
import CopyForAI from '@site/src/components/CopyForAI';

export default function ContentWrapper(props) {
  return (
    <>
      <CopyForAI />
      <Content {...props} />
    </>
  );
}
