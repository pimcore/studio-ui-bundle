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
import { type TwoFactorChallenge } from './hooks/use-two-factor-authentication'

interface AuthState {
  isAuthenticated: boolean | undefined
  // Set when the session holds a login that still waits for its two-factor code, e.g. after an SSO redirect
  twoFactor?: TwoFactorChallenge
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
    setTwoFactorChallenge (state, action: PayloadAction<TwoFactorChallenge | undefined>) {
      state.twoFactor = action.payload
    },
    resetAuthState (state) {
      state.isAuthenticated = undefined
    }
  }
})

injectSliceWithState(authSlice)

export const { setAuthState, setTwoFactorChallenge, resetAuthState } = authSlice.actions
export const selectIsAuthenticated = (state: RootState): AuthState['isAuthenticated'] => state.authentication.isAuthenticated
export const selectTwoFactorChallenge = (state: RootState): AuthState['twoFactor'] => state.authentication.twoFactor
export default authSlice.reducer
