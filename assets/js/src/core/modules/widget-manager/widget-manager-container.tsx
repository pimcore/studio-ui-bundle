/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { WidgetManagerView } from './widget-manager-view'
import { widgetManagerFactory } from './utils/widget-manager-factory'
import { Actions, type ITabRenderValues, Model, type TabNode, type TabSetNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { selectOuterModel, updateOuterModel } from './widget-manager-slice'
import { TabTitleContainer } from './title/tab-title-container'

export const WidgetManagerContainer = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectOuterModel)
  const dispatch = useAppDispatch()
  const model = Model.fromJson(modelJson)
  const bottomTabset = model.getNodeById('bottom_tabset') as TabSetNode

  model.doAction(Actions.updateModelAttributes({
    tabSetTabStripHeight: 34,
    tabSetTabHeaderHeight: 34,
    borderBarSize: 50
  }))

  if (bottomTabset.getChildren().length === 0) {
    model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: -8 }))
  } else if (bottomTabset.getHeight() === -8) {
    model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: 34 }))
  }

  function onModelChange (model: Model): void {
    dispatch(updateOuterModel(model.toJson()))
  }

  function onRenderTab (node: TabNode, renderValues: ITabRenderValues): void {
    renderValues.content = <TabTitleContainer node={ node } />
    renderValues.leading = <></>
  }

  return (
    <WidgetManagerView
      factory={ widgetManagerFactory }
      model={ model }
      onModelChange={ onModelChange }
      onRenderTab={ onRenderTab }
    />
  )
}
