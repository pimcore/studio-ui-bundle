/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

import React, { memo, useEffect } from 'react'
import { WidgetManagerView } from './widget-manager-view'
import { widgetManagerFactory } from './utils/widget-manager-factory'
import { Actions, type ITabRenderValues, Model, type TabNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@Pimcore/app/store/index'
import { selectInnerModel, updateInnerModel, updateMainWidgetContext } from './widget-manager-slice'
import { getTabTokens } from './widget-manager-view.styles'
import { theme } from 'antd'
import { TabTitleContainer } from './title/tab-title-container'

const { useToken } = theme

const WidgetManagerInnerContainer = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectInnerModel)
  const dispatch = useAppDispatch()
  const model = Model.fromJson(modelJson)
  const { token } = useToken()

  useEffect(() => {
    const tabToken = getTabTokens(token)

    model.doAction(Actions.updateModelAttributes({
      tabSetTabStripHeight: tabToken.cardHeight,
      tabSetTabHeaderHeight: tabToken.cardHeight,
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
    renderValues.content = <TabTitleContainer node={ node } />
    renderValues.leading = <></>
  }

  return (
    <WidgetManagerView
      className='widget-manager--inner'
      factory={ widgetManagerFactory }
      model={ model }
      onModelChange={ onModelChange }
      onRenderTab={ onRenderTab }
    />
  )
}

const MemoizedWidgetManagerInnerContainer = memo(WidgetManagerInnerContainer)

export { MemoizedWidgetManagerInnerContainer as WidgetManagerInnerContainer }
