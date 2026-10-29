/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, useEffect, useRef, type MouseEvent } from 'react'
import cn from 'classnames'
import { type TabNode } from 'flexlayout-react'
import { useAppDispatch } from '@sdk/app'
import { Box } from '@Pimcore/components/box/box'
import { TabTitleOuterContainer } from './tab-title-outer-container'
import { toggleMainWidgetMaximize } from '../widget-manager-slice'
import { useStyles } from './main-tab-title.styles'

export interface MainTabTitleProps {
  node: TabNode
}

const MainTabTitleInner = ({ node }: MainTabTitleProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles()
  const pressTargets = useRef<{ previous: EventTarget | null, current: EventTarget | null }>({ previous: null, current: null })

  // the browser counts clicks by position, so a press on another element (e.g. a close button) can come first
  useEffect(() => {
    const onPress = (event: globalThis.MouseEvent): void => {
      pressTargets.current = { previous: pressTargets.current.current, current: event.target }
    }

    document.addEventListener('mousedown', onPress, true)

    return () => {
      document.removeEventListener('mousedown', onPress, true)
    }
  }, [])

  // flexlayout's drag glass swallows the dblclick event, the second press carries the click count
  const onMouseDown = useCallback((event: MouseEvent<HTMLElement>): void => {
    const previousTarget = pressTargets.current.previous
    const previousHitTitle = previousTarget instanceof Node && event.currentTarget.contains(previousTarget)

    if (event.button === 0 && event.detail === 2 && previousHitTitle) {
      dispatch(toggleMainWidgetMaximize(node.getId()))
    }
  }, [dispatch, node])

  return (
    <Box
      className={ cn('widget-manager__main-tab-title', styles.title) }
      component='span'
      onMouseDown={ onMouseDown }
    >
      <TabTitleOuterContainer node={ node } />
    </Box>
  )
}

export const MainTabTitle = memo(MainTabTitleInner)
