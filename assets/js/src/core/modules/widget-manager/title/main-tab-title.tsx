/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, useEffect, type MouseEvent } from 'react'
import cn from 'classnames'
import { type TabNode } from 'flexlayout-react'
import { useAppDispatch } from '@sdk/app'
import { Box } from '@Pimcore/components/box/box'
import { TabTitleOuterContainer } from './tab-title-outer-container'
import { expandMainWidget } from '../widget-manager-slice'
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

const MainTabTitleInner = ({ node }: MainTabTitleProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles()

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
      className={ cn('widget-manager__main-tab-title', styles.title) }
      component='span'
      data-tab-id={ node.getId() }
      onMouseDown={ onMouseDown }
    >
      <TabTitleOuterContainer node={ node } />
    </Box>
  )
}

export const MainTabTitle = memo(MainTabTitleInner)
