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
import cn from 'classnames'
import { Button } from '@Pimcore/components/button/button'
import { Dropdown, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { usePaging } from '@Pimcore/modules/element/listing/decorators/paging/context-layer/paging/provider/use-paging'
import { useData } from '@Pimcore/modules/element/listing/abstract/data-layer/provider/data/use-data'
import { useGeneralFiltersConfig } from '../../../context-layer/provider/general-filters-config/use-general-filters-config'
import { useAppliedFilters } from '../../../element-filters/stores'
import { readElementFilterValues } from '../../../element-filters/use-element-filter-values'
import { FULLTEXT_SEARCH_MODE_ID } from '../../../search-modes/constants'
import { useSearchMode } from '../../../search-modes/use-search-mode'
import { useStyles } from './search-mode-select.styles'

/**
 * Default entry of the `element.listing.search.slots.prefix` component slot. Self-contained: it
 * reads the listing context itself (no props), so any other component can occupy the same slot.
 * Renders nothing when the host listing has no element type or no registered search modes.
 */
export const SearchModeSelect = (): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { handleSearchTermInSidebar } = useGeneralFiltersConfig()
  const searchMode = useSearchMode(handleSearchTermInSidebar ? 'draft' : 'applied')
  const { values } = useAppliedFilters()
  const { setPage } = usePaging()
  const { setDataLoadingState } = useData()

  if (searchMode === undefined || searchMode.modes.length === 0) {
    return null
  }

  const { modes, modeContext, activeModeId, activeMode } = searchMode
  const appliedSearchTerm = readElementFilterValues(values).searchTerm

  // Collapsed full-text label variant: the search modal shows "Default", the sidebar "Full text".
  const fulltextLabel = handleSearchTermInSidebar
    ? t('listing.search-mode.full-text-short')
    : t('listing.search-mode.default')

  function onModeChange (modeId: string): void {
    if (searchMode === undefined || modeId === searchMode.activeModeId) {
      return
    }

    searchMode.setModeId(modeId)

    const targetMode = searchMode.modes.find((mode) => mode.id === modeId)
    const targetAvailability = targetMode?.getAvailability(searchMode.modeContext)
    const targetBlocked = targetAvailability !== undefined &&
      (targetAvailability.blocked || !targetAvailability.available)

    // Immediate-apply surfaces re-run the applied term under the new mode; blocked targets must
    // not be submitted. Sidebar surfaces apply on the Apply button instead.
    if (!handleSearchTermInSidebar && appliedSearchTerm !== '' && !targetBlocked) {
      setPage(1)
      setDataLoadingState('filters-applied')
    }
  }

  const items: ItemType[] = [
    {
      key: FULLTEXT_SEARCH_MODE_ID,
      icon: <Icon value='full-text-search' />,
      label: t('listing.search-mode.full-text')
    },
    ...modes.map((mode): ItemType => {
      const availability = mode.getAvailability(modeContext)

      return {
        key: mode.id,
        icon: <Icon value={ mode.icon } />,
        disabled: !availability.available,
        label: (
          <>
            {mode.getMenuLabel()}
            {availability.hint !== undefined && (
              <Text
                className={ styles.menuHint }
                type='secondary'
              >
                {availability.hint}
              </Text>
            )}
          </>
        )
      }
    })
  ]

  return (
    <Dropdown
      menu={ {
        items,
        selectable: true,
        selectedKeys: [activeModeId],
        onClick: ({ key }) => { onModeChange(key) }
      } }
      trigger={ ['click'] }
    >
      <Button
        className={ styles.trigger }
        data-testid='search-mode-select'
        type='text'
      >
        <Icon value='chevron-down' />
        <span className={ cn({ [styles.activeTriggerLabel]: activeMode !== undefined }) }>
          {activeMode !== undefined ? activeMode.getCollapsedLabel() : fulltextLabel}
        </span>
      </Button>
    </Dropdown>
  )
}
