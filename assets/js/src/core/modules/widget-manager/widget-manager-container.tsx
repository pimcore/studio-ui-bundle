/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useCallback, useEffect, useRef } from 'react'
import { WidgetManagerView } from './widget-manager-view'
import { widgetManagerFactory } from './utils/widget-manager-factory'
import { type Action, Actions, type IJsonModel, type ITabRenderValues, Model, type TabNode, type TabSetNode } from 'flexlayout-react'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { selectOuterModel, setActiveWidgetById, updateOuterModel } from './widget-manager-slice'
import { TabTitleOuterContainer } from './title/tab-title-outer-container'
import { isMainAreaMaximized } from './utils/maximize-main-widget'
import { getSideWidgetMotion } from './hooks/use-side-widget-motion'

export const WidgetManagerContainer = (): React.JSX.Element => {
  const modelJson = useAppSelector(selectOuterModel)
  const dispatch = useAppDispatch()

  const modelRef = useRef<Model>(Model.fromJson(modelJson))
  const prevModelJsonRef = useRef<IJsonModel>(modelJson)
  const skipModelSyncRef = useRef(false)

  if (modelJson !== prevModelJsonRef.current) {
    prevModelJsonRef.current = modelJson

    if (!skipModelSyncRef.current) {
      modelRef.current = Model.fromJson(modelJson)
    }

    skipModelSyncRef.current = false
  }

  const model = modelRef.current

  useEffect(() => {
    modelRef.current.doAction(Actions.updateModelAttributes({
      tabSetTabStripHeight: 34,
      tabSetTabHeaderHeight: 34,
      borderBarSize: 50
    }))
  }, [])

  useEffect(() => {
    const bottomTabset = model.getNodeById('bottom_tabset') as TabSetNode

    if (bottomTabset === undefined) {
      return
    }

    if (bottomTabset.getChildren().length === 0) {
      model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: -8 }))
    } else if (bottomTabset.getHeight() === -8) {
      model.doAction(Actions.updateNodeAttributes(bottomTabset.getId(), { height: 300 }))
    }
  }, [model])

  const onModelChange = useCallback((updatedModel: Model): void => {
    skipModelSyncRef.current = true

    dispatch(updateOuterModel(updatedModel.toJson()))
  }, [dispatch])

  // opening a side widget while maximized also ends the mode, so the slice does both
  const onAction = useCallback((action: Action): Action | undefined => {
    if (isMainAreaMaximized(model) && getSideWidgetMotion(model, action) === 'opening') {
      dispatch(setActiveWidgetById(action.data.tabNode as string))
      return undefined
    }

    return action
  }, [model, dispatch])

  const onRenderTab = useCallback((node: TabNode, renderValues: ITabRenderValues): void => {
    renderValues.content = <TabTitleOuterContainer node={ node } />
    renderValues.leading = <></>
  }, [])

  return (
    <WidgetManagerView
      factory={ widgetManagerFactory }
      model={ model }
      onAction={ onAction }
      onModelChange={ onModelChange }
      onRenderTab={ onRenderTab }
    />
  )
}
