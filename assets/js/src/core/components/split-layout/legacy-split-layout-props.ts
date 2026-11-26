/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PageLayoutSplitProps } from '../page-layout/page-layout'

// The props of the deprecated SplitLayout and ConfigLayout, kept out of the SDK exports.
export interface LegacySplitLayoutProps extends Omit<PageLayoutSplitProps, 'variant' | 'fullWidth' | 'resizable' | 'className'> {
  /** Shows only the left item, at full width (with both flags set, both items stay visible). */
  leftItemFullWidth?: boolean
  /** Shows only the right item, at full width (with both flags set, both items stay visible). */
  rightItemFullWidth?: boolean
  resizeAble?: boolean
}
