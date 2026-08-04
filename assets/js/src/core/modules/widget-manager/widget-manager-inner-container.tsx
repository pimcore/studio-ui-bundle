/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { memo, useCallback, useEffect, useRef } from 'react'
import { WidgetManagerView } from './widget-manager-view'
import { widgetManagerFactory } from './utils/widget-manager-factory'
import { Actions, type IJsonModel, type ITabRenderValues, Model, type TabNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { selectInnerModel, selectMainWidgetContext, updateInnerModel, updateMainWidgetContext } from './widget-manager-slice'
import { resolveMainWidgetContext } from './utils/resolve-main-widget-context'
import { TabTitleOuterContainer } from './title/tab-title-outer-container'
import { createContextMenuItems } from '@Pimcore/modules/widget-manager/context-menu/context-menu'
import { isEqual } from 'lodash'

const WidgetManagerInnerContainer = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectInnerModel)
  const mainWidgetContext = useAppSelector(selectMainWidgetContext)
  const dispatch = useAppDispatch()

  // keep a stable model instance: only recreate when the redux action
  // changes the JSON (e.g. openMainWidget, closeWidget).
  const modelRef = useRef<Model>(Model.fromJson(modelJson))
  const prevModelJsonRef = useRef<IJsonModel>(modelJson)
  const lastSelfDispatchedJsonRef = useRef<IJsonModel | null>(null)

  if (modelJson !== prevModelJsonRef.current) {
    prevModelJsonRef.current = modelJson

    // keep the model instance only when the incoming JSON is the echo of this
    // component's own onModelChange dispatch — a foreign action (e.g. openMainWidget)
    // can land in the same render batch as that echo and must recreate the model
    if (!isEqual(lastSelfDispatchedJsonRef.current, modelJson)) {
      modelRef.current = Model.fromJson(modelJson)
    }

    lastSelfDispatchedJsonRef.current = null
  }

  const model = modelRef.current
  const tabCount = model.getActiveTabset()?.getChildren().length ?? 0

  useEffect(() => {
    modelRef.current.doAction(Actions.updateModelAttributes({
      tabSetTabStripHeight: 34,
      tabSetTabHeaderHeight: 34,
      borderBarSize: 50
    }))
  }, [])

  useEffect(() => {
    if (mainWidgetContext !== null) {
      return
    }

    const context = resolveMainWidgetContext(model)

    if (context !== null) {
      dispatch(updateMainWidgetContext(context))
    }
  }, [model, mainWidgetContext, dispatch])

  const onModelChange = useCallback((updatedModel: Model): void => {
    const selectedNode = updatedModel.getActiveTabset()?.getSelectedNode()

    if (selectedNode !== undefined) {
      dispatch(updateMainWidgetContext({ nodeId: selectedNode.getId() }))
    }

    const updatedModelJson = updatedModel.toJson()
    lastSelfDispatchedJsonRef.current = updatedModelJson
    dispatch(updateInnerModel(updatedModelJson))
  }, [dispatch])

  const onRenderTab = useCallback((node: TabNode, renderValues: ITabRenderValues): void => {
    renderValues.content = <TabTitleOuterContainer node={ node } />
    renderValues.leading = <></>
  }, [])

  return (
    <WidgetManagerView
      className='widget-manager--inner'
      createContextMenuItems={ createContextMenuItems }
      factory={ widgetManagerFactory }
      key={ tabCount === 0 ? 'empty' : 'tabs' }
      model={ model }
      onModelChange={ onModelChange }
      onRenderTab={ onRenderTab }
    />
  )
}

const MemoizedWidgetManagerInnerContainer = memo(WidgetManagerInnerContainer)

export { MemoizedWidgetManagerInnerContainer as WidgetManagerInnerContainer }
