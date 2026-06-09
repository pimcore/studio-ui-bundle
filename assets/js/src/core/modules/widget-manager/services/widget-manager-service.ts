/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectable } from 'inversify'
import { store } from '@Pimcore/app/store'
import {
  closeWidget as closeWidgetAction,
  openBottomWidget as openBottomWidgetAction,
  openLeftWidget as openLeftWidgetAction,
  openMainWidget as openMainWidgetAction,
  openRightWidget as openRightWidgetAction,
  updateWidget as updateWidgetAction,
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

@injectable()
export class WidgetManagerService {
  openMainWidget (tabConfig: WidgetManagerTabConfig): void {
    store.dispatch(openMainWidgetAction(tabConfig))
  }

  updateWidget (tabConfig: WidgetManagerTabConfig): void {
    store.dispatch(updateWidgetAction(tabConfig))
  }

  openBottomWidget (tabConfig: WidgetManagerTabConfig): void {
    store.dispatch(openBottomWidgetAction(tabConfig))
  }

  openLeftWidget (tabConfig: WidgetManagerTabConfig): void {
    store.dispatch(openLeftWidgetAction(tabConfig))
  }

  openRightWidget (tabConfig: WidgetManagerTabConfig): void {
    store.dispatch(openRightWidgetAction(tabConfig))
  }

  switchToWidget (id: string): void {
    store.dispatch(setActiveWidgetById(id))
  }

  closeWidget (id: string): void {
    const innerWidgetData = this.getInnerWidgetData(id)
    const outerWidgetData = this.getOuterWidgetData(id)

    store.dispatch(closeWidgetAction(id))

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

  isMainWidgetOpen (id: string): boolean {
    return this.getInnerModel().getNodeById(id) !== undefined
  }

  hasOuterWidget (id: string): boolean {
    return this.getOuterModel().getNodeById(id) !== undefined
  }

  getOpenedMainWidget (): TabNode | undefined {
    return this.getInnerModel().getActiveTabset()?.getSelectedNode() as TabNode | undefined
  }

  private getInnerWidgetData (id: string): CloseMainWidgetEventPayload | null {
    try {
      const innerModel = this.getInnerModel()
      const node = innerModel.getNodeById(id)

      if (!isUndefined(node) && node instanceof TabNode) {
        return { widgetId: id, node }
      }
    } catch (error) {
      console.warn('Could not retrieve inner widget data for event:', error)
    }

    return null
  }

  private getOuterWidgetData (id: string): CloseOuterWidgetEventPayload | null {
    try {
      const outerModel = this.getOuterModel()
      const node = outerModel.getNodeById(id)

      if (!isUndefined(node) && node instanceof TabNode) {
        return { widgetId: id, node }
      }
    } catch (error) {
      console.warn('Could not retrieve outer widget data for event:', error)
    }

    return null
  }

  private getInnerModel (): Model {
    const state = store.getState()
    const modelJson = selectInnerModel(state as { [widgetManagerSliceName]: WidgetManagerState })
    return Model.fromJson(modelJson)
  }

  private getOuterModel (): Model {
    const state = store.getState()
    const modelJson = selectOuterModel(state as { [widgetManagerSliceName]: WidgetManagerState })
    return Model.fromJson(modelJson)
  }
}
