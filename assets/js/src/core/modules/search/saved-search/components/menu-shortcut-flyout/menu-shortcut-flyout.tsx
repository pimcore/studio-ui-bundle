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
import { useTranslation } from 'react-i18next'
import { type MenuProps } from 'antd'
import { isEmpty, isNil } from 'lodash'
import { Dropdown, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { useSavedSearchGetMenuShortcutConfigurationsQuery } from '@Pimcore/modules/search/search-api-slice-enhanced'
import { type SavedSearchConfigurationListItem } from '@Pimcore/modules/search/search-api-slice.gen'
import { SearchButton } from '@Pimcore/modules/search/triggers/button/search-button'
import { useOpenSavedSearch } from '@Pimcore/modules/search/saved-search/hooks/use-open-saved-search'
import { useStyles } from './menu-shortcut-flyout.styles'

const UNGROUPED = ''

/** Groups the shortcut items by their menuShortcutGroup, keeping ungrouped ones first. */
const groupItems = (items: SavedSearchConfigurationListItem[]): Array<[string, SavedSearchConfigurationListItem[]]> => {
  const groups = new Map<string, SavedSearchConfigurationListItem[]>()
  items.forEach((item) => {
    const group = isNil(item.menuShortcutGroup) || isEmpty(item.menuShortcutGroup) ? UNGROUPED : item.menuShortcutGroup
    const bucket = groups.get(group) ?? []
    bucket.push(item)
    groups.set(group, bucket)
  })

  return [...groups.entries()].sort(([a], [b]) => (a === UNGROUPED ? -1 : b === UNGROUPED ? 1 : a.localeCompare(b)))
}

/**
 * Wraps the left-sidebar search button with a hover flyout listing the saved searches that are
 * flagged as menu shortcuts. Clicking the icon opens the Quick Search modal (#1943); clicking a
 * shortcut opens that saved search as a main-area tab. Grouped shortcuts fly out as cascading
 * submenus.
 */
export const MenuShortcutFlyout = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()

  const { data } = useSavedSearchGetMenuShortcutConfigurationsQuery()
  const { open, openingId } = useOpenSavedSearch()

  const items = data?.items ?? []

  // No shortcuts — just the plain search button, no flyout.
  if (isEmpty(items)) {
    return <SearchButton />
  }

  const toMenuItem = (item: SavedSearchConfigurationListItem): ItemType => ({
    key: String(item.id),
    label: (
      <span
        className={ styles.shortcutName }
        data-testid='saved-search-shortcut-open'
      >{item.name}</span>
    ),
    isLoading: openingId === item.id
  })

  // "Saved Searches" header, then the shortcuts: ungrouped at the top level, groups as cascading
  // submenus.
  const menuItems: ItemType[] = [
    {
      type: 'custom',
      key: '__header',
      component: <div className={ styles.header }>{t('saved-search.saved-searches')}</div>
    },
    ...groupItems(items).flatMap(([group, groupEntries]): ItemType[] =>
      group === UNGROUPED
        ? groupEntries.map(toMenuItem)
        : [{ key: `group:${group}`, label: group, children: groupEntries.map(toMenuItem) }]
    )
  ]

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    const id = Number(key)
    if (!Number.isNaN(id)) {
      open(id)
    }
  }

  return (
    <Dropdown
      // Open to the right of the left-sidebar icon (Dropdown has no 'right' placement).
      align={ { points: ['tl', 'tr'], offset: [8, 0] } }
      menu={ { items: menuItems, onClick: onMenuClick, selectable: false } }
      trigger={ ['hover'] }
    >
      <span>
        <SearchButton />
      </span>
    </Dropdown>
  )
}
