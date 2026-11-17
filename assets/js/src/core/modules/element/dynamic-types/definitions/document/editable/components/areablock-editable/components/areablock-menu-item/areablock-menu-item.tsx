/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { isUndefined } from 'lodash'
import { useTranslation } from 'react-i18next'
import { theme } from 'antd'
import { ThemeProvider } from 'antd-style'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { type AreaInsertPosition } from '../../areablock-editable'
import { useStyles } from './areablock-menu-item.styles'

// The areablock toolbar (ToolStrip) raises itself to z-index 10000 while activated
// (see tool-strip.styles.ts), which sits above antd's default popup z-index range.
// The first entry in this menu is rendered directly beneath that toolbar, so its
// tooltip (opening upward by default) would otherwise be painted behind it. Elements
// that must render above the activated toolbar use 10001 elsewhere in the app
// (see editable-dialog.tsx), so match that convention here.
export const areablockMenuTooltipZIndex = 10001

export interface AreablockMenuItemProps {
  name: string
  tooltipTitle?: React.ReactNode
  /**
   * Left out in the empty state, where there is no entry to insert above or below
   * and the new area always becomes the first one.
   */
  onInsert?: (position: AreaInsertPosition) => void
}

export const AreablockMenuItem = ({ name, tooltipTitle, onInsert }: AreablockMenuItemProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { token } = theme.useToken()

  // This menu opens from the areablock entry header, an inverse ToolStrip whose
  // ThemeProvider repaints link buttons for a dark strip (see tool-strip.tsx). The
  // popup is portalled in the DOM but still sits inside that provider, so without
  // this the buttons would be near-white on the light menu. Only the Button link
  // colours are restored; the ToolStrip's own buttons keep theirs.
  const buttonTheme = useMemo(() => ({
    components: {
      Button: {
        colorLink: token.colorLink,
        colorLinkHover: token.colorLinkHover,
        colorLinkActive: token.colorLinkActive,
        colorTextDisabled: token.colorTextDisabled
      }
    }
  }), [token])

  // Clicking the row itself already inserts below, so a position button must not
  // reach the menu item underneath it.
  const handleInsert = (position: AreaInsertPosition) => (event: React.MouseEvent): void => {
    event.stopPropagation()
    onInsert?.(position)
  }

  // Enter and Space activate the button natively, and the resulting click is stopped
  // above. The keydown itself still travels to the antd menu item, which would run
  // the row's insert below and close the menu, so stop it here without preventing
  // the activation.
  const handleActivationKey = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation()
    }
  }

  return (
    <span className={ styles.item }>
      <Tooltip
        title={ tooltipTitle }
        zIndex={ areablockMenuTooltipZIndex }
      >
        <span className={ styles.name }>{name}</span>
      </Tooltip>

      {!isUndefined(onInsert) && (
        <ThemeProvider theme={ buttonTheme }>
          <span className={ styles.positions }>
            <IconButton
              aria-label={ t('areablock.insert-above') }
              className={ styles.positionButton }
              icon={ { value: 'insert-above', options: { width: 16, height: 16 } } }
              onClick={ handleInsert('above') }
              onKeyDown={ handleActivationKey }
              size="small"
              tooltip={ { title: t('areablock.insert-above'), zIndex: areablockMenuTooltipZIndex } }
            />

            <IconButton
              aria-label={ t('areablock.insert-below') }
              className={ styles.positionButton }
              icon={ { value: 'insert-below', options: { width: 16, height: 16 } } }
              onClick={ handleInsert('below') }
              onKeyDown={ handleActivationKey }
              size="small"
              tooltip={ { title: t('areablock.insert-below'), zIndex: areablockMenuTooltipZIndex } }
            />
          </span>
        </ThemeProvider>
      )}
    </span>
  )
}
