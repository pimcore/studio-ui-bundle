/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createPersistedReduxReducer } from '../../utils/redux-state-persistence'
import { store } from '@sdk/app'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { type WidgetManagerTabConfig, type WidgetManagerState } from './widget-manager-slice'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type WidgetRestorerRegistry } from './services/widget-restorer-registry'
import { Model, Actions, type TabNode, type IJsonModel } from 'flexlayout-react'
import { type Reducer, type UnknownAction } from '@reduxjs/toolkit'
import { isNil } from 'lodash'

export const WIDGET_MANAGER_STORAGE_KEY = 'widget_manager_inner_model'

export const getWidgetManagerStorageKey = (userId?: number): string => {
  if (!isNil(userId) && userId !== 0) {
    return `${WIDGET_MANAGER_STORAGE_KEY}_${userId}`
  }
  return WIDGET_MANAGER_STORAGE_KEY
}

export const createWidgetManagerPersistedReducer = (reducer: Reducer<WidgetManagerState, UnknownAction>): Reducer<WidgetManagerState, UnknownAction> => {
  return createPersistedReduxReducer(
    reducer,
    () => {
      const state = store.getState()
      const user = selectCurrentUser(state)
      return getWidgetManagerStorageKey(user?.id)
    },
    (state: WidgetManagerState) => {
      const widgetRestorerRegistry = container.get<WidgetRestorerRegistry>(serviceIds.widgetRestorerRegistry)
      const model = Model.fromJson(state.innerModel as IJsonModel)
      const unsupportedTabIds: string[] = []
      const supportedTabs: Array<{ id: string, config: WidgetManagerTabConfig }> = []

      model.visitNodes((node) => {
        if (node.getType() === 'tab') {
          const config = (node as TabNode).toJson() as WidgetManagerTabConfig
          if (widgetRestorerRegistry.supports(config) === true) {
            supportedTabs.push({
              id: node.getId(),
              config: widgetRestorerRegistry.cleanConfig(config)
            })
          } else {
            unsupportedTabIds.push(node.getId())
          }
        }
      })

      unsupportedTabIds.forEach(id => {
        model.doAction(Actions.deleteTab(id))
      })

      supportedTabs.forEach(({ id, config }) => {
        model.doAction(Actions.updateNodeAttributes(id, config))
      })

      return model.toJson()
    }
  )
}
