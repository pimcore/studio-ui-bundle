/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

/**
 * A `Space` gives every child its own `.ant-space-item`, and that element is the
 * boundary `useHideParentWhenHidden` collapses when a field renders nothing.
 *
 * A container that lays its children out itself renders no such element, so
 * `closest()` would walk straight past it and could collapse an outer Space item
 * that still holds populated siblings. Such a container opts in by putting
 * `HIDE_BOUNDARY_CLASS` on each of its item wrappers instead.
 *
 * Kept free of the styles barrel so it can be imported from a jest test without
 * dragging antd-style's untranspiled ESM in.
 */
export const HIDE_BOUNDARY_CLASS = 'pimcore-hide-boundary'

export const HIDE_BOUNDARY_SELECTOR = `.ant-space-item, .${HIDE_BOUNDARY_CLASS}`
