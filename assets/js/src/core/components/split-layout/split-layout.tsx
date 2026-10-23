/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { PageLayout, type PageLayoutSplitOptions } from '../page-layout/page-layout'

/**
 * @deprecated Use `PageLayoutSplitProps` (with `variant: 'split'`) instead.
 * This type is kept for backward compatibility and will be removed in the next major version.
 */
export interface SplitLayoutProps extends PageLayoutSplitOptions {}

/**
 * @deprecated Use `PageLayout` with `variant="split"` instead; the other props are the same.
 * This alias is kept for backward compatibility and will be removed in the next major version.
 */
export const SplitLayout = (props: SplitLayoutProps): React.JSX.Element => (
  <PageLayout
    { ...props }
    variant="split"
  />
)
