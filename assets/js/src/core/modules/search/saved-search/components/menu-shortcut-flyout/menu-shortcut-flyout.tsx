/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Popover, type MenuProps } from 'antd'
import { isEmpty, isNil, isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Menu, type ItemType } from '@Pimcore/components/menu/menu'
import { useMessage } from '@Pimcore/components/message/useMessage'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  useSavedSearchGetMenuShortcutConfigurationsQuery,
  useSavedSearchUpdateMenuShortcutMutation
} from '@Pimcore/modules/search/search-api-slice-enhanced'
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
 * flagged as menu shortcuts. Clicking the icon still opens the Quick Search modal (#1943); clicking
 * a shortcut opens that saved search as a main-area tab. Owners can remove a shortcut from the menu.
 */
export const MenuShortcutFlyout = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const message = useMessage()

  const { data } = useSavedSearchGetMenuShortcutConfigurationsQuery()
  const { open, openingId } = useOpenSavedSearch()
  const [updateMenuShortcut] = useSavedSearchUpdateMenuShortcutMutation()
  const [removingId, setRemovingId] = useState<number | undefined>(undefined)

  const items = data?.items ?? []

  // No shortcuts — just the plain search button, no flyout.
  if (isEmpty(items)) {
    return <SearchButton />
  }

  const onRemove = (id: number): void => {
    setRemovingId(id)
    updateMenuShortcut({ id, body: { createMenuShortcut: false } }).then((result) => {
      if ('error' in result && !isUndefined(result.error)) {
        trackError(new ApiError(result.error))
        return
      }
      message.success(t('saved-search.menu-shortcut.removed'))
    }).catch(() => { /* trigger never rejects; error handled via the result above */ })
      .finally(() => { setRemovingId(undefined) })
  }

  // Each shortcut row: the name (clicking the row opens the search) plus a remove action for owners.
  const renderItemLabel = (item: SavedSearchConfigurationListItem): React.JSX.Element => (
    <Flex
      align='center'
      gap='small'
      justify='space-between'
    >
      <span
        className={ styles.shortcutName }
        data-testid='saved-search-shortcut-open'
      >{item.name}</span>
      {item.owner && (
        <IconButton
          data-testid='saved-search-shortcut-remove'
          icon={ { value: 'trash' } }
          loading={ removingId === item.id }
          onClick={ (event) => {
            event.stopPropagation()
            onRemove(item.id)
          } }
          tooltip={ { title: t('saved-search.menu-shortcut.remove') } }
          type='link'
        />
      )}
    </Flex>
  )

  const toMenuItem = (item: SavedSearchConfigurationListItem): ItemType => ({
    key: String(item.id),
    label: renderItemLabel(item),
    isLoading: openingId === item.id
  })

  // Grouped shortcuts become submenus; ungrouped ones stay at the top level.
  const grouped = groupItems(items)
  const menuItems: ItemType[] = grouped.flatMap(([group, groupEntries]): ItemType[] =>
    group === UNGROUPED
      ? groupEntries.map(toMenuItem)
      : [{ key: `group:${group}`, label: group, children: groupEntries.map(toMenuItem) }]
  )
  // Inline submenus (expanded by default) so they stay inside the hover flyout — a popup submenu
  // would render outside the Popover and dismiss it when the pointer moves onto it.
  const openGroupKeys = grouped.filter(([group]) => group !== UNGROUPED).map(([group]) => `group:${group}`)

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (!key.startsWith('group:')) {
      open(Number(key))
    }
  }

  const content = (
    <div className={ styles.flyout }>
      <Menu
        defaultOpenKeys={ openGroupKeys }
        items={ menuItems }
        mode='inline'
        onClick={ onMenuClick }
        selectable={ false }
      />
    </div>
  )

  return (
    <Popover
      content={ content }
      mouseEnterDelay={ 0.4 }
      placement='right'
      title={ t('saved-search.saved-searches') }
      trigger='hover'
    >
      <span>
        <SearchButton />
      </span>
    </Popover>
  )
}
