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
import { TabTitleOuterContainer } from './tab-title-outer-container'
import { toggleMainWidgetMaximize } from '../widget-manager-slice'
import { useStyles } from './main-tab-title.styles'

export interface MainTabTitleProps {
  node: TabNode
}

const MainTabTitleInner = ({ node }: MainTabTitleProps): React.JSX.Element => {
  const dispatch = useAppDispatch()
  const { styles } = useStyles()
  const titleRef = useRef<HTMLSpanElement>(null)
  const pressesHitTitle = useRef({ previous: false, current: false })

  // the browser counts clicks by position, so a press on another element (e.g. a close button) can come first
  useEffect(() => {
    const title = titleRef.current

    if (title === null) {
      return
    }

    const onPress = (event: globalThis.MouseEvent): void => {
      pressesHitTitle.current = {
        previous: pressesHitTitle.current.current,
        current: event.target instanceof Node && title.contains(event.target)
      }
    }

    title.ownerDocument.addEventListener('mousedown', onPress, true)

    return () => {
      title.ownerDocument.removeEventListener('mousedown', onPress, true)
    }
  }, [])

  // flexlayout's drag glass swallows the dblclick event, the second press carries the click count
  const onMouseDown = useCallback((event: MouseEvent): void => {
    if (event.button === 0 && event.detail === 2 && pressesHitTitle.current.previous) {
      dispatch(toggleMainWidgetMaximize(node.getId()))
    }
  }, [dispatch, node])

  return (
    <span
      className={ cn('widget-manager__main-tab-title', styles.title) }
      onMouseDown={ onMouseDown }
      ref={ titleRef }
      role='presentation'
    >
      <TabTitleOuterContainer node={ node } />
    </span>
  )
}

export const MainTabTitle = memo(MainTabTitleInner)
