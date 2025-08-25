/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

/**
 * Fallback icons for areablock types
 * Selected neutral icons that work well as generic content element representations
 */
const FALLBACK_ICON_STORE = [
  'accessory', 'bookmark', 'catalog', 'cms', 'content', 'custom-metadata', 'document-types',
  'embedded-metadata', 'favorites', , 'focal-point', 'list', 'market', 'package', 'webhook',
  'widget'
]

/**
 * Gets the icon for an areablock type, applying fallback logic if no icon is provided
 */
export const getAreablockTypeIcon = (icon: string | undefined, index: number): ElementIcon => {
  if (isNonEmptyString(icon)) {
    // If icon contains a dot, treat it as a path, otherwise as a name
    if (icon.includes('.')) {
      return {
        type: 'path',
        value: icon
      }
    } else {
      return {
        type: 'name',
        value: icon
      }
    }
  }

  // Apply fallback logic using the predefined icon store
  const fallbackIcon = FALLBACK_ICON_STORE[index % FALLBACK_ICON_STORE.length]
  return {
    type: 'name',
    value: fallbackIcon
  }
}
