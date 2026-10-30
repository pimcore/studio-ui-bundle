/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type React from 'react'
import { PageLayoutPane, type PageLayoutPaneProps } from '../../../page-layout/components/split/page-layout-pane'

/**
 * @deprecated Use `PageLayoutPaneProps` instead, the item type of the `split` and `config` variants of `PageLayout`.
 * This type is kept for backward compatibility and will be removed in the next major version.
 */
export interface SplitLayoutItemProps extends PageLayoutPaneProps {}

/**
 * @deprecated Use `PageLayout` with `variant="split"` instead; it renders its items itself.
 * This alias is kept for backward compatibility and will be removed in the next major version.
 */
const forwardedComponent: React.ForwardRefExoticComponent<PageLayoutPaneProps & React.RefAttributes<unknown>> = PageLayoutPane

export { forwardedComponent as SplitLayoutItem }
