import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type TabsProps } from 'antd'
import type { Tab } from 'rc-tabs/lib/interface'
import { injectSliceWithState } from '@Pimcore/app/store'

export interface ToolbarState {
  items: TabsProps['items']
}

const initialState: ToolbarState = {
  items: []
}

export const toolbarSlice = createSlice({
  name: 'toolbar',

  initialState,

  reducers: {
    selectSlice: (state) => {
      return state
    },

    setItems: (state, action: PayloadAction<TabsProps['items']>) => {
      state.items = action.payload
    },

    addItem: (state, action: PayloadAction<Tab>) => {
      console.log(action)

      if (state.items !== undefined) {
        state.items.push(action.payload)
      }
    }
  },
  selectors: {
    getItems: (state) => {
      return state.items
    }
  }
})

injectSliceWithState(toolbarSlice)

export const { actions, selectors } = toolbarSlice

export const { setItems, addItem } = actions

export const { getItems } = selectors
