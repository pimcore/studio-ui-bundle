import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PredefinedProperty } from '@sdk/api/properties'
import { injectSliceWithState } from '@sdk/app'

export type GlobalProperty = PredefinedProperty & { rowId: string }

interface GlobalPropertiesState {
  properties: GlobalProperty[]
  modified: boolean
}

const initialState: GlobalPropertiesState = {
  properties: [],
  modified: false
}

export const globalPropertiesSlice = createSlice({
  name: 'globalProperties',
  initialState,
  reducers: {
    setProperties(state, action: PayloadAction<GlobalProperty[]>) {
      state.properties = action.payload
      state.modified = true
    },
    addProperty(state, action: PayloadAction<GlobalProperty>) {
      state.properties.push(action.payload)
      state.modified = true
    },
    updateProperty(state, action: PayloadAction<{ key: string; updatedProperty: GlobalProperty }>) {
      const index = state.properties.findIndex(prop => prop.key === action.payload.key)
      if (index !== -1) {
        state.properties[index] = action.payload.updatedProperty
        state.modified = true
      }
    },
    removeProperty(state, action: PayloadAction<string>) {
      state.properties = state.properties.filter(prop => prop.key !== action.payload)
      state.modified = true
    },
    resetModified(state) {
      state.modified = false
    }
  }
})

injectSliceWithState(globalPropertiesSlice)

export const {
  setProperties,
  addProperty,
  updateProperty,
  removeProperty,
  resetModified
} = globalPropertiesSlice.actions

export default globalPropertiesSlice.reducer
