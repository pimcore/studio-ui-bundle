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
  setActiveWidgetById,
  type widgetManagerSliceName,
  type WidgetManagerState,
  type WidgetManagerTabConfig
} from '../widget-manager-slice'
import { Model, TabNode } from 'flexlayout-react'
import { eventBus } from '@Pimcore/lib/event-bus'
import { eventTypes } from '@Pimcore/lib/event-bus/event-types'
import { type CloseMainWidgetEvent, type CloseMainWidgetEventPayload } from '../events'
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
    const widgetData = getMainWidgetData(id)

    dispatch(closeWidgetAction(id))

    if (!isNull(widgetData)) {
      const event: CloseMainWidgetEvent = {
        identifier: {
          type: eventTypes['widget-manager:inner:widget-closed'],
          id
        },
        payload: widgetData
      }
      eventBus.publish(event)
    }
  }

  function getMainWidgetData (id: string): CloseMainWidgetEventPayload | null {
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
      console.warn('Could not retrieve main widget data for event:', error)
    }

    return null
  }

  function getInnerModel (): Model {
    const state = store.getState()
    const modelJson = selectInnerModel(state as { [widgetManagerSliceName]: WidgetManagerState })
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
