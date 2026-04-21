/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { injectSliceWithState } from '@sdk/app'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IJsonModel, type IJsonTabNode, Model, Actions, DockLocation, type Node, BorderNode } from 'flexlayout-react'
import { getInitialModelJson as getInitialOuterModelJson } from './utils/widget-manager-outer-model'
import { getInitialModelJson as getInitialInnerModelJson } from './utils/widget-manager-inner-model'
import { createWidgetManagerPersistedReducer } from './widget-manager-persistence'
import { type IconColorGroup } from '@Pimcore/components/icon/icon-color-groups-registry'
import { type ElementIcon } from '@sdk/components'
import { type UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

export interface IMainWidgetContext {
  nodeId: string
}

export type MainWidgetContext = IMainWidgetContext | null

export interface WidgetManagerState {
  outerModel: IJsonModel
  innerModel: IJsonModel
  mainWidgetContext: MainWidgetContext
}

export interface WidgetManagerTabConfig extends Omit<IJsonTabNode, 'icon'> {
  permission?: UserPermission
  config: {
    translationKey?: string
    label?: string
    icon?: ElementIcon
    iconColorGroup?: IconColorGroup
    [key: string]: any
  }
}

export const initialState: WidgetManagerState = {
  outerModel: getInitialOuterModelJson(),
  innerModel: getInitialInnerModelJson(),
  mainWidgetContext: null
}

const getNextTabId = (node: Node): string | undefined => {
  const parent = node.getParent()

  if (isUndefined(parent)) {
    return undefined
  }

  const siblings = parent.getChildren()
  const closedIndex = siblings.findIndex((child) => child.getId() === node.getId())

  if (siblings.length <= 1) {
    return undefined
  }

  const nextIndex = closedIndex < siblings.length - 1 ? closedIndex + 1 : closedIndex - 1
  return siblings[nextIndex].getId()
}

const slice = createSlice({
  name: 'widget-manager',

  initialState,

  reducers: {
    updateOuterModel: (state, action: PayloadAction<IJsonModel>) => {
      state.outerModel = { ...action.payload }
    },

    updateInnerModel: (state, action: PayloadAction<IJsonModel>) => {
      state.innerModel = { ...action.payload }
    },

    updateMainWidgetContext: (state, action: PayloadAction<MainWidgetContext>) => {
      state.mainWidgetContext = action.payload
    },

    setActiveWidgetById: (state, action: PayloadAction<string>) => {
      const outerModel = Model.fromJson(state.outerModel)
      const innerModel = Model.fromJson(state.innerModel)

      let node = outerModel.getNodeById(action.payload)
      let model = outerModel
      let isOuterModelNode = true

      if (node === undefined) {
        node = innerModel.getNodeById(action.payload)
        model = innerModel
        isOuterModelNode = false
      }

      if (node !== undefined) {
        const parent = node.getParent()

        if (parent !== undefined && ((parent instanceof BorderNode && parent.getSelectedNode() !== node) || !(parent instanceof BorderNode))) {
          model.doAction(Actions.selectTab(node.getId()))
        }
      }

      if (isOuterModelNode) {
        state.outerModel = { ...model.toJson() }
      } else {
        state.innerModel = { ...model.toJson() }
      }
    },

    openMainWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.innerModel)
      let node: Node | undefined

      if (action.payload.id !== undefined) {
        node = model.getNodeById(action.payload.id)
      }

      if (node !== undefined) {
        model.doAction(Actions.selectTab(node.getId()))
      } else {
        model.doAction(
          Actions.addNode(
            action.payload,
            'main_tabset',
            DockLocation.CENTER,
            -1,
            true
          )
        )
      }

      state.innerModel = { ...model.toJson() }
    },

    updateWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.innerModel)
      let node: Node | undefined

      if (action.payload.id !== undefined) {
        node = model.getNodeById(action.payload.id)
      }

      if (node !== undefined) {
        model.doAction(Actions.updateNodeAttributes(node.getId(), action.payload))
        state.innerModel = { ...model.toJson() }
      }
    },

    openBottomWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.outerModel)
      let node: Node | undefined

      if (action.payload.id !== undefined) {
        node = model.getNodeById(action.payload.id)
      }

      if (node !== undefined) {
        model.doAction(Actions.selectTab(node.getId()))
      } else {
        model.doAction(
          Actions.addNode(
            action.payload,
            'bottom_tabset',
            DockLocation.CENTER,
            -1,
            true
          )
        )
      }

      state.outerModel = { ...model.toJson() }
    },

    openLeftWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.outerModel)
      let node: Node | undefined

      if (action.payload.id !== undefined) {
        node = model.getNodeById(action.payload.id)
      }

      if (node !== undefined) {
        model.doAction(Actions.selectTab(node.getId()))
      } else {
        model.doAction(
          Actions.addNode(
            action.payload,
            'border_left',
            DockLocation.CENTER,
            -1,
            true
          )
        )
      }

      state.outerModel = { ...model.toJson() }
    },

    openRightWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.outerModel)
      let node: Node | undefined

      if (action.payload.id !== undefined) {
        node = model.getNodeById(action.payload.id)
      }

      if (node !== undefined) {
        model.doAction(Actions.selectTab(node.getId()))
      } else {
        model.doAction(
          Actions.addNode(
            action.payload,
            'border_right',
            DockLocation.CENTER,
            -1,
            true
          )
        )
      }

      state.outerModel = { ...model.toJson() }
    },

    closeWidget: (state, action: PayloadAction<string>) => {
      const outerModel = Model.fromJson(state.outerModel)
      const innerModel = Model.fromJson(state.innerModel)

      let node = outerModel.getNodeById(action.payload)
      let model = outerModel
      let isOuterModelNode = true

      if (node === undefined) {
        node = innerModel.getNodeById(action.payload)
        model = innerModel
        isOuterModelNode = false
      }

      if (node !== undefined) {
        const nextTabId = isOuterModelNode ? undefined : getNextTabId(node)

        model.doAction(Actions.deleteTab(node.getId()))

        if (!isUndefined(nextTabId) && !isUndefined(model.getNodeById(nextTabId))) {
          model.doAction(Actions.selectTab(nextTabId))
        }
      }

      if (isOuterModelNode) {
        state.outerModel = { ...model.toJson() }
      } else {
        state.innerModel = { ...model.toJson() }
      }
    }
  },

  selectors: {
    selectOuterModel: (state) => {
      return state.outerModel
    },

    selectInnerModel: (state) => {
      return state.innerModel
    },

    selectMainWidgetContext: (state) => {
      return state.mainWidgetContext
    }
  }
})

export const widgetManagerSliceName = slice.name

const persistedReducer = createWidgetManagerPersistedReducer(slice.reducer)

injectSliceWithState({
  ...slice,
  reducer: persistedReducer
})

export const { updateOuterModel, updateMainWidgetContext, updateInnerModel, openMainWidget, updateWidget, openBottomWidget, openLeftWidget, openRightWidget, setActiveWidgetById, closeWidget } = slice.actions
export const { selectInnerModel, selectOuterModel, selectMainWidgetContext } = slice.selectors
