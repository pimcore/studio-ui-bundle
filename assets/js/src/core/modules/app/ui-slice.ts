import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  isBackgroundAnimationEnabled: boolean
}

const initialState: UiState = {
  isBackgroundAnimationEnabled: true
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleBackgroundAnimation: (state) => {
      state.isBackgroundAnimationEnabled = !state.isBackgroundAnimationEnabled
    },
    setBackgroundAnimationEnabled: (state, action: PayloadAction<boolean>) => {
      state.isBackgroundAnimationEnabled = action.payload
    }
  }
})

export const { toggleBackgroundAnimation, setBackgroundAnimationEnabled } = uiSlice.actions
