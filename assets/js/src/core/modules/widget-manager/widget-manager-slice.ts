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

import { injectSliceWithState } from '@Pimcore/app/store/index'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IJsonModel, type IJsonTabNode, Model, Actions, DockLocation, type Node, BorderNode } from 'flexlayout-react'
import { getInitialModelJson as getInitialOuterModelJson } from './utils/widget-manager-outer-model'
import { getInitialModelJson as getInitialInnerModelJson } from './utils/widget-manager-inner-model'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'

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
  config: {
    icon?: ElementIcon
    [key: string]: any
  }
}

export const initialState: WidgetManagerState = {
  outerModel: getInitialOuterModelJson(),
  innerModel: getInitialInnerModelJson(),
  mainWidgetContext: null
}

export const slice = createSlice({
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
        model.doAction(Actions.deleteTab(node.getId()))
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

injectSliceWithState(slice)

export const { updateOuterModel, updateMainWidgetContext, updateInnerModel, openMainWidget, openBottomWidget, openLeftWidget, openRightWidget, setActiveWidgetById, closeWidget } = slice.actions
export const { selectInnerModel, selectOuterModel, selectMainWidgetContext } = slice.selectors
