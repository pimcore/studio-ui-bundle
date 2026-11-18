/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useContext, useMemo, type HTMLAttributes, type KeyboardEvent } from 'react'
import cn from 'classnames'
import { type TabNode } from 'flexlayout-react'
import { useAppSelector } from '@sdk/app'
import { TabTitleOuterContainer } from './tab-title-outer-container'
import { TabTitleLabelContext } from './tab-title-label-context'
import { selectMainWidgetContext } from '../widget-manager-slice'
import { TabContextMenuContext } from '../hooks/use-context-menu'
import { useStyles } from './main-tab-title.styles'

export interface MainTabTitleProps {
  node: TabNode
}

const NO_LABEL_PROPS: HTMLAttributes<HTMLSpanElement> = {}

const opensMenu = (event: KeyboardEvent): boolean =>
  ['Enter', ' ', 'ContextMenu'].includes(event.key) || (event.key === 'F10' && event.shiftKey)

const MainTabTitleInner = ({ node }: MainTabTitleProps): React.JSX.Element => {
  const { styles } = useStyles()
  const isActive = useAppSelector(selectMainWidgetContext)?.nodeId === node.getId()
  const { openTabId, openFromKeyboard } = useContext(TabContextMenuContext)
  const isMenuOpen = openTabId === node.getId()

  const labelProps = useMemo((): HTMLAttributes<HTMLSpanElement> => {
    if (!isActive) {
      return NO_LABEL_PROPS
    }

    return {
      role: 'button',
      tabIndex: 0,
      'aria-haspopup': 'menu',
      'aria-expanded': isMenuOpen,
      onKeyDown: (event) => {
        if (opensMenu(event)) {
          event.preventDefault()
          openFromKeyboard?.(node, event.currentTarget)
        }
      },
      // screen readers press a button with a click that no mouse made
      onClick: (event) => {
        if (event.detail === 0) {
          openFromKeyboard?.(node, event.currentTarget)
        }
      }
    }
  }, [isActive, isMenuOpen, node, openFromKeyboard])

  return (
    <span
      className={ cn('widget-manager__main-tab-title', styles.title) }
      data-tab-id={ node.getId() }
    >
      <TabTitleLabelContext.Provider value={ labelProps }>
        <TabTitleOuterContainer node={ node } />
      </TabTitleLabelContext.Provider>
    </span>
  )
}

export const MainTabTitle = memo(MainTabTitleInner)
