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
import { Popover } from 'antd'
import { isEmpty, isNil, isUndefined } from 'lodash'
import { Flex } from '@Pimcore/components/flex/flex'
import { Button } from '@Pimcore/components/button/button'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Text } from '@Pimcore/components/text/text'
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

  const content = (
    <Flex
      className={ styles.flyout }
      gap='mini'
      vertical
    >
      {groupItems(items).map(([group, groupEntries]) => (
        <React.Fragment key={ group === UNGROUPED ? '__ungrouped__' : group }>
          {group !== UNGROUPED && <Text className={ styles.groupLabel }>{group}</Text>}
          {groupEntries.map((item) => (
            <div
              className={ styles.row }
              key={ item.id }
            >
              <Button
                className='saved-search-shortcut-open'
                data-testid='saved-search-shortcut-open'
                loading={ openingId === item.id }
                onClick={ () => { open(item.id) } }
                type='text'
              >
                {item.name}
              </Button>
              {item.owner && (
                <IconButton
                  data-testid='saved-search-shortcut-remove'
                  icon={ { value: 'trash' } }
                  loading={ removingId === item.id }
                  onClick={ () => { onRemove(item.id) } }
                  tooltip={ { title: t('saved-search.menu-shortcut.remove') } }
                  type='link'
                />
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </Flex>
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
