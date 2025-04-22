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

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { type UserInformation } from '@Pimcore/modules/auth/user/user-api-slice-enhanced'

// The logic dependency is in the rtkQueryErrorLogger middleware
const initialState: UserInformation = {
  id: 0,
  username: '',
  permissions: [],
  isAdmin: false,
  classes: [],
  docTypes: [],
  activePerspective: 0,
  perspectives: [],
  language: 'en'
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<UserInformation>
    ) => {
      return { ...state, ...payload }
    }
  }
})

export const userSliceName = slice.name

injectSliceWithState(slice)

export const { setUser } = slice.actions

export const selectCurrentUser = (state: RootState): UserInformation => state.auth
