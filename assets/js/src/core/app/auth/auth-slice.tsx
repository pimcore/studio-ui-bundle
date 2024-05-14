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

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { type User } from '@Pimcore/components/login-form/services/auth'
import { type RootState } from '@Pimcore/components/login-form/store'
import { injectSliceWithState } from '@Pimcore/app/store'

interface AuthState {
  user: User | null
  token: string | null
}

const initialState: AuthState = {
  user: null,
  token: null
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token }
      }: PayloadAction<{ user: User, token: string }>
    ) => {
      state.user = user
      state.token = token
    }
  }
})

injectSliceWithState(slice)

export const { setCredentials } = slice.actions

export const authReducer = slice.reducer

export const selectCurrentUser = (state: RootState): User | null => state.auth.user
