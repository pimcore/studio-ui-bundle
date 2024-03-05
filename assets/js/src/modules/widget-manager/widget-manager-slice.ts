import { injectSliceWithState } from '@Pimcore/app/store/index'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IJsonModel, type IJsonTabNode, Model, Actions, DockLocation, type Node } from 'flexlayout-react'
import { getInitialModelJson } from './utils/widget-manager-model'

export interface WidgetManagerState {
  model: IJsonModel
}

export interface WidgetManagerTabConfig extends IJsonTabNode {}

export const initialState: WidgetManagerState = {
  model: getInitialModelJson()
}

export const slice = createSlice({
  name: 'widget-manager',

  initialState,

  reducers: {
    updateModel: (state, action: PayloadAction<IJsonModel>) => {
      state.model = { ...action.payload }
    },

    setActiveWidgetById: (state, action: PayloadAction<string>) => {
      const model = Model.fromJson(state.model)
      const node = model.getNodeById(action.payload)

      if (node !== undefined) {
        model.doAction(Actions.selectTab(node.getId()))
      }

      state.model = { ...model.toJson() }
    },

    openMainWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.model)
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

      state.model = { ...model.toJson() }
    },

    openBottomWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.model)
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

      state.model = { ...model.toJson() }
    },

    openLeftWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.model)
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

      state.model = { ...model.toJson() }
    },

    openRightWidget: (state, action: PayloadAction<WidgetManagerTabConfig>) => {
      const model = Model.fromJson(state.model)
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

      state.model = { ...model.toJson() }
    }
  },

  selectors: {
    selectModel: (state) => {
      return state.model
    }
  }
})

injectSliceWithState(slice)

export const { updateModel, openMainWidget, openBottomWidget, openLeftWidget, openRightWidget, setActiveWidgetById } = slice.actions
export const { selectModel } = slice.selectors
