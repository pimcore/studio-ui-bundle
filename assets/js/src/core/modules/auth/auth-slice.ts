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
import { type TwoFactorStep } from './hooks/use-two-factor-authentication'

interface AuthState {
  isAuthenticated: boolean | undefined
  // Set when the session holds a login that still waits for its two-factor code, e.g. after an SSO redirect
  twoFactorStep?: TwoFactorStep
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
    setTwoFactorStep (state, action: PayloadAction<TwoFactorStep | undefined>) {
      state.twoFactorStep = action.payload
    },
    resetAuthState (state) {
      state.isAuthenticated = undefined
    }
  }
})

injectSliceWithState(authSlice)

export const { setAuthState, setTwoFactorStep, resetAuthState } = authSlice.actions
export const selectIsAuthenticated = (state: RootState): AuthState['isAuthenticated'] => state.authentication.isAuthenticated
export const selectTwoFactorStep = (state: RootState): AuthState['twoFactorStep'] => state.authentication.twoFactorStep
export default authSlice.reducer
