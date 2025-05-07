/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useEffect } from 'react'
import { WidgetManagerView } from './widget-manager-view'
import { widgetManagerFactory } from './utils/widget-manager-factory'
import { Actions, type ITabRenderValues, Model, type TabNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store/index'
import { selectInnerModel, updateInnerModel, updateMainWidgetContext } from './widget-manager-slice'
import { TabTitleOuterContainer } from './title/tab-title-outer-container'
import { createContextMenuItems } from '@Pimcore/modules/widget-manager/context-menu/context-menu'

const WidgetManagerInnerContainer = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectInnerModel)
  const dispatch = useAppDispatch()
  const model = Model.fromJson(modelJson)

  useEffect(() => {
    model.doAction(Actions.updateModelAttributes({
      tabSetTabStripHeight: 34,
      tabSetTabHeaderHeight: 34,
      borderBarSize: 50
    }))
  }, [])

  useEffect(() => {
    const selectedNode: TabNode | undefined = model.getActiveTabset()?.getSelectedNode() as TabNode | undefined

    if (selectedNode !== undefined) {
      dispatch(updateMainWidgetContext({
        nodeId: selectedNode.getId()
      }))
    } else {
      dispatch(updateMainWidgetContext(null))
    }
  }, [model])

  function onModelChange (model: Model): void {
    dispatch(updateInnerModel(model.toJson()))
  }

  function onRenderTab (node: TabNode, renderValues: ITabRenderValues): void {
    renderValues.content = <TabTitleOuterContainer node={ node } />
    renderValues.leading = <></>
  }

  return (
    <WidgetManagerView
      className='widget-manager--inner'
      createContextMenuItems={ createContextMenuItems }
      factory={ widgetManagerFactory }
      model={ model }
      onModelChange={ onModelChange }
      onRenderTab={ onRenderTab }
    />
  )
}

const MemoizedWidgetManagerInnerContainer = memo(WidgetManagerInnerContainer)

export { MemoizedWidgetManagerInnerContainer as WidgetManagerInnerContainer }
