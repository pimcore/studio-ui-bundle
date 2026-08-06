/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import type { ElementIcon } from '@Pimcore/components/icon/icon'

export interface SortableItem {
  id: number | string
  label: string
  active?: boolean
  icon?: ElementIcon
}

export interface SortableItemWithMenu extends SortableItem {
  contextMenuItems?: DropdownProps['menu']['items']
}
