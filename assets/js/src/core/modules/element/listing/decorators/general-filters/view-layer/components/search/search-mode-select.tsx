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
import { FULLTEXT_SEARCH_MODE_ID } from '../../../search-modes/constants'
import { type UseSearchModeReturn } from '../../../search-modes/use-search-mode'
import { useStyles } from './search-mode-select.styles'

export interface SearchModeSelectProps {
  searchMode: UseSearchModeReturn
  /** Collapsed full-text label variant: the search modal shows "Default", the sidebar "Full text". */
  fulltextLabel: string
  onModeChange: (modeId: string) => void
}

export const SearchModeSelect = ({ searchMode, fulltextLabel, onModeChange }: SearchModeSelectProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { modes, modeContext, activeModeId, activeMode } = searchMode

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
