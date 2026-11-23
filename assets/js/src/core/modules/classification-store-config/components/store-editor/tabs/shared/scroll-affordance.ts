/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type CSSProperties } from 'react'

/** Edge shadows that show only on a side with more content, plus a thin always-visible scrollbar. */
export const getScrollAffordanceStyle = (background: string, shadow: string): CSSProperties => ({
  overflowX: 'auto',
  scrollbarWidth: 'thin',
  background: [
    `linear-gradient(to right, ${background} 30%, transparent) left center / 40px 100% no-repeat local`,
    `linear-gradient(to left, ${background} 30%, transparent) right center / 40px 100% no-repeat local`,
    `radial-gradient(farthest-side at 0 50%, ${shadow}, transparent) left center / 12px 100% no-repeat scroll`,
    `radial-gradient(farthest-side at 100% 50%, ${shadow}, transparent) right center / 12px 100% no-repeat scroll`
  ].join(', ')
})
