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
import { PageLayout, type PageLayoutSplitProps } from '../page-layout/page-layout'
import { type LegacySplitLayoutProps } from './legacy-split-layout-props'

/**
 * @deprecated Use `PageLayoutSplitProps` (with `variant: 'split'`) instead.
 * This type is kept for backward compatibility and will be removed in the next major version.
 */
export interface SplitLayoutProps extends LegacySplitLayoutProps {}

const toFullWidth = (leftItemFullWidth: boolean, rightItemFullWidth: boolean): PageLayoutSplitProps['fullWidth'] => {
  if (leftItemFullWidth === rightItemFullWidth) {
    return undefined
  }

  return leftItemFullWidth ? 'left' : 'right'
}

/**
 * @deprecated Use `PageLayout` with `variant="split"` instead: `leftItemFullWidth` and `rightItemFullWidth`
 * became `fullWidth="left"` and `fullWidth="right"`, `resizeAble` became `resizable`, the other props are the same.
 * This alias is kept for backward compatibility and will be removed in the next major version.
 */
export const SplitLayout = ({ leftItemFullWidth = false, rightItemFullWidth = false, resizeAble, ...props }: LegacySplitLayoutProps): React.JSX.Element => (
  <PageLayout
    { ...props }
    fullWidth={ toFullWidth(leftItemFullWidth, rightItemFullWidth) }
    resizable={ resizeAble }
    variant="split"
  />
)
