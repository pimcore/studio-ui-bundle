/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, type MouseEvent } from 'react'
import { type TabNode } from 'flexlayout-react'
import { useAppDispatch } from '@sdk/app'
import { TabTitleOuterContainer } from './tab-title-outer-container'
import { toggleMainWidgetMaximize } from '../widget-manager-slice'

export interface MainTabTitleProps {
  node: TabNode
}

const MainTabTitleInner = ({ node }: MainTabTitleProps): React.JSX.Element => {
  const dispatch = useAppDispatch()

  // flexlayout's drag glass swallows the dblclick event, the second press carries the click count
  const onMouseDown = useCallback((event: MouseEvent): void => {
    if (event.button === 0 && event.detail === 2) {
      dispatch(toggleMainWidgetMaximize(node.getId()))
    }
  }, [dispatch, node])

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      className='widget-manager__main-tab-title'
      onMouseDown={ onMouseDown }
      style={ { display: 'contents' } }
    >
      <TabTitleOuterContainer node={ node } />
    </span>
  )
}

export const MainTabTitle = memo(MainTabTitleInner)
