/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store, useAppDispatch } from '@Pimcore/app/store'
import {
  closeWidget as closeWidgetAction,
  openBottomWidget as openBottomWidgetAction,
  openLeftWidget as openLeftWidgetAction,
  openMainWidget as openMainWidgetAction,
  openRightWidget as openRightWidgetAction,
  selectInnerModel,
  selectOuterModel,
  setActiveWidgetById,
  type widgetManagerSliceName,
  type WidgetManagerState,
  type WidgetManagerTabConfig
} from '../widget-manager-slice'
import { Model, TabNode } from 'flexlayout-react'
import { eventBus } from '@Pimcore/lib/event-bus'
import { eventTypes } from '@Pimcore/lib/event-bus/event-types'
import { 
  type CloseMainWidgetEvent, 
  type CloseMainWidgetEventPayload,
  type CloseOuterWidgetEvent,
  type CloseOuterWidgetEventPayload
} from '../events'
import { isNull, isUndefined } from 'lodash'

interface useWidgetManagerReturn {
  openMainWidget: (tabConfig: WidgetManagerTabConfig) => void
  openBottomWidget: (tabConfig: WidgetManagerTabConfig) => void
  openLeftWidget: (tabConfig: WidgetManagerTabConfig) => void
  openRightWidget: (tabConfig: WidgetManagerTabConfig) => void
  switchToWidget: (id: string) => void
  closeWidget: (id: string) => void
  isMainWidgetOpen: (id: string) => boolean
  getOpenedMainWidget: () => TabNode | undefined
}

export const useWidgetManager = (): useWidgetManagerReturn => {
  const dispatch = useAppDispatch()

  function openMainWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openMainWidgetAction(tabConfig))
  }

  function openBottomWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openBottomWidgetAction(tabConfig))
  }

  function openLeftWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openLeftWidgetAction(tabConfig))
  }

  function openRightWidget (tabConfig: WidgetManagerTabConfig): void {
    dispatch(openRightWidgetAction(tabConfig))
  }

  function switchToWidget (id: string): void {
    dispatch(setActiveWidgetById(id))
  }

  function closeWidget (id: string): void {
    const innerWidgetData = getInnerWidgetData(id)
    const outerWidgetData = getOuterWidgetData(id)
    
    dispatch(closeWidgetAction(id))

    if (!isNull(innerWidgetData)) {
      const event: CloseMainWidgetEvent = {
        identifier: {
          type: eventTypes['widget-manager:inner:widget-closed'],
          id
        },
        payload: innerWidgetData
      }
      eventBus.publish(event)
    }

    if (!isNull(outerWidgetData)) {
      console.log("OUTER WIDGET DATA:", outerWidgetData);
      
      const event: CloseOuterWidgetEvent = {
        identifier: {
          type: eventTypes['widget-manager:outer:widget-closed'],
          id
        },
        payload: outerWidgetData
      }
      eventBus.publish(event)
    }
  }

  function getInnerWidgetData (id: string): CloseMainWidgetEventPayload | null {
    try {
      const innerModel = getInnerModel()
      const node = innerModel.getNodeById(id)

      if (!isUndefined(node) && node instanceof TabNode) {
        return {
          widgetId: id,
          node
        }
      }
    } catch (error) {
      console.warn('Could not retrieve inner widget data for event:', error)
    }

    return null
  }

  function getOuterWidgetData (id: string): CloseOuterWidgetEventPayload | null {
    try {
      const outerModel = getOuterModel()
      const node = outerModel.getNodeById(id)

      if (!isUndefined(node) && node instanceof TabNode) {
        return {
          widgetId: id,
          node
        }
      }
    } catch (error) {
      console.warn('Could not retrieve outer widget data for event:', error)
    }

    return null
  }

  function getInnerModel (): Model {
    const state = store.getState()
    const modelJson = selectInnerModel(state as { [widgetManagerSliceName]: WidgetManagerState })
    return Model.fromJson(modelJson)
  }

  function getOuterModel (): Model {
    const state = store.getState()
    const modelJson = selectOuterModel(state as { [widgetManagerSliceName]: WidgetManagerState })
    return Model.fromJson(modelJson)
  }

  function isMainWidgetOpen (id: string): boolean {
    return getInnerModel().getNodeById(id) !== undefined
  }

  function getOpenedMainWidget (): TabNode | undefined {
    return getInnerModel().getActiveTabset()?.getSelectedNode() as TabNode | undefined
  }

  return {
    openMainWidget,
    openBottomWidget,
    openLeftWidget,
    openRightWidget,
    switchToWidget,
    closeWidget,
    isMainWidgetOpen,
    getOpenedMainWidget
  }
}
