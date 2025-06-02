/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { injectSliceWithState, type RootState } from '@sdk/app'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean | undefined
}

const initialState: AuthState = {
  isAuthenticated: undefined
}

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthState (state, action: PayloadAction<boolean | undefined>) {
      state.isAuthenticated = action.payload
    },
    resetAuthState (state) {
      state.isAuthenticated = undefined
    }
  }
})

injectSliceWithState(authSlice)

export const { setAuthState, resetAuthState } = authSlice.actions
export const selectIsAuthenticated = (state: RootState): AuthState['isAuthenticated'] => state.authentication.isAuthenticated
export default authSlice.reducer
