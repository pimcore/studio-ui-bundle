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
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { type IUser } from '@Pimcore/modules/auth/auth-api-slice'

interface AuthState {
  username: string | null
  roles: string[] | []
}

const initialState: AuthState = {
  username: null,
  roles: []
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      {
        payload: { username, roles }
      }: PayloadAction<IUser>
    ) => {
      state.username = username
      state.roles = roles
    }
  }
})

injectSliceWithState(slice)

export const { setUser } = slice.actions

// export const authReducer = slice.reducer

export const selectCurrentUser = (state: RootState): IUser | null => state.auth
