/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, useEffect, type KeyboardEvent, type MouseEvent } from 'react'
import cn from 'classnames'
import { type TabNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { Box } from '@Pimcore/components/box/box'
import { TabTitleOuterContainer } from './tab-title-outer-container'
import { expandMainWidget, selectMainWidgetContext } from '../widget-manager-slice'
import { useStyles } from './main-tab-title.styles'

export interface MainTabTitleProps {
  node: TabNode
}

// the browser counts clicks by position, so a press on another element (e.g. a close button) can come first;
// kept by tab id for all titles, because selecting a tab can remount its title between the two presses
const pressedTabIds: { previous?: string, current?: string } = {}
let mountedTitles = 0

const recordPress = (event: globalThis.MouseEvent): void => {
  const title = event.target instanceof Element ? event.target.closest<HTMLElement>('.widget-manager__main-tab-title') : null
  pressedTabIds.previous = pressedTabIds.current
  pressedTabIds.current = title?.dataset.tabId
}

// opens the tab's context menu the way the context menu key does, below the title
const openContextMenu = (event: KeyboardEvent<HTMLElement>): void => {
  if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) {
    return
  }

  event.preventDefault()
  const { left, bottom } = event.currentTarget.getBoundingClientRect()
  event.currentTarget.dispatchEvent(new globalThis.MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: left, clientY: bottom }))
}

const MainTabTitleInner = ({ node }: MainTabTitleProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles()
  const isActive = useAppSelector(selectMainWidgetContext)?.nodeId === node.getId()

  useEffect(() => {
    mountedTitles += 1

    if (mountedTitles === 1) {
      document.addEventListener('mousedown', recordPress, true)
    }

    return () => {
      mountedTitles -= 1

      if (mountedTitles === 0) {
        document.removeEventListener('mousedown', recordPress, true)
      }
    }
  }, [])

  // flexlayout's drag glass swallows the dblclick event, the second press carries the click count
  const onMouseDown = useCallback((event: MouseEvent<HTMLElement>): void => {
    if (event.button === 0 && event.detail === 2 && pressedTabIds.previous === node.getId()) {
      dispatch(expandMainWidget(node.getId()))
    }
  }, [dispatch, node])

  return (
    <Box
      aria-haspopup={ isActive ? 'menu' : undefined }
      className={ cn('widget-manager__main-tab-title', styles.title) }
      component='span'
      data-tab-id={ node.getId() }
      onKeyDown={ isActive ? openContextMenu : undefined }
      onMouseDown={ onMouseDown }
      role={ isActive ? 'button' : undefined }
      tabIndex={ isActive ? 0 : undefined }
    >
      <TabTitleOuterContainer node={ node } />
    </Box>
  )
}

export const MainTabTitle = memo(MainTabTitleInner)
