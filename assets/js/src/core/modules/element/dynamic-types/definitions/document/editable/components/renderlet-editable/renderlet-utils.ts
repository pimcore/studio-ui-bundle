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
 * Maps a Studio element type to the type stored in the renderlet value.
 *
 * Studio refers to data objects as 'data-object', whereas the renderlet editable
 * (and core's Renderlet editable, which resolves the element via
 * Element\Service::getElementById) expects 'object'.
 */
export const getRenderletElementType = (elementType: string): string => {
  return elementType === 'data-object' ? 'object' : elementType
}
