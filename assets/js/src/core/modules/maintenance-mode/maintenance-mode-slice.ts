/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'

interface MaintenanceModeState {
  // Studio's API answered with the HTML 503 page the maintenance mode shows to every other session
  isLockedOut: boolean
}

const initialState: MaintenanceModeState = {
  isLockedOut: false
}

// The store middleware dispatches `maintenance-mode/setLockedOut` by its type, as it cannot import this slice
export const maintenanceModeSlice = createSlice({
  initialState,
  name: 'maintenance-mode',
  reducers: {
    setLockedOut (state, action: PayloadAction<boolean>) {
      state.isLockedOut = action.payload
    }
  }
})

injectSliceWithState(maintenanceModeSlice)

export const { setLockedOut } = maintenanceModeSlice.actions
export const selectIsLockedOut = (state: RootState): boolean => state['maintenance-mode']?.isLockedOut === true
