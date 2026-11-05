/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { multiSelectionContextMenuActions } from '@Pimcore/modules/element/actions'

/**
 * Keeps only the menu entries that act on a whole selection.
 *
 * Entries without a key - dividers, for instance - go as well: on their own they
 * would just leave dangling separators behind.
 */
export const toMultiSelectionMenuItems = (items: ItemType[]): ItemType[] => {
  return items.filter(item => {
    if (isNil(item) || !('key' in item) || isNil(item.key)) {
      return false
    }

    return multiSelectionContextMenuActions.includes(String(item.key))
  })
}
