/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { ContextMenuActionName } from '@Pimcore/modules/element/actions'
import { toMultiSelectionMenuItems } from './multi-selection-menu-items'

const item = (key: string): ItemType => {
  const menuItem: ItemType = { key, label: key }

  return menuItem
}

describe('toMultiSelectionMenuItems', () => {
  it('keeps the actions that handle a whole selection', () => {
    const items = toMultiSelectionMenuItems([
      item(ContextMenuActionName.delete),
      item(ContextMenuActionName.cut)
    ])

    expect(items.map(entry => (entry as { key: string }).key)).toEqual(['delete', 'cut'])
  })

  it('drops single element actions', () => {
    const items = toMultiSelectionMenuItems([
      item(ContextMenuActionName.rename),
      item(ContextMenuActionName.delete),
      item(ContextMenuActionName.addFolder),
      item(ContextMenuActionName.publish),
      item(ContextMenuActionName.download)
    ])

    expect(items.map(entry => (entry as { key: string }).key)).toEqual(['delete'])
  })

  it('drops dividers and entries without a key, which would leave dangling separators', () => {
    const divider: ItemType = { type: 'divider' }

    const items = toMultiSelectionMenuItems([
      divider,
      null as unknown as ItemType,
      item(ContextMenuActionName.delete)
    ])

    expect(items).toHaveLength(1)
  })

  it('returns nothing when no action supports a selection', () => {
    expect(toMultiSelectionMenuItems([item(ContextMenuActionName.rename)])).toEqual([])
  })
})
