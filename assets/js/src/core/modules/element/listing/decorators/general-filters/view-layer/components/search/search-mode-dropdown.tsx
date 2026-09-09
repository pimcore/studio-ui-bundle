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
import cn from 'classnames'
import { IconTextButton } from '@Pimcore/components/icon-text-button/icon-text-button'
import { Dropdown, type ItemType } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { Text } from '@Pimcore/components/text/text'
import { FULLTEXT_SEARCH_MODE_ID } from '../../../search-modes/constants'
import { type SearchModeAbstract, type SearchModeContext } from '../../../search-modes/search-mode-abstract'
import { useStyles } from './search-mode-dropdown.styles'

export interface SearchModeDropdownProps {
  /** Modes to list. */
  modes: SearchModeAbstract[]
  modeContext: SearchModeContext
  activeModeId: string
  activeMode: SearchModeAbstract | undefined
  /** Collapsed label of the built-in full-text entry. */
  fulltextLabel: string
  onModeChange: (modeId: string) => void
}

/** Trigger button and menu; no store or listing context. */
export const SearchModeDropdown = ({ modes, modeContext, activeModeId, activeMode, fulltextLabel, onModeChange }: SearchModeDropdownProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const [open, setOpen] = useState(false)

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
      onOpenChange={ setOpen }
      trigger={ ['click'] }
    >
      <IconTextButton
        className={ styles.trigger }
        data-testid='search-mode-select'
        icon={ { value: open ? 'chevron-up' : 'chevron-down', options: { width: 12, height: 12 } } }
      >
        <span className={ cn({ [styles.activeTriggerLabel]: activeMode !== undefined }) }>
          {activeMode !== undefined ? activeMode.getCollapsedLabel() : fulltextLabel}
        </span>
      </IconTextButton>
    </Dropdown>
  )
}
