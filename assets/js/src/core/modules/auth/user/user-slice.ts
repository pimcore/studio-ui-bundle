/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { type UserInformation } from '@Pimcore/modules/auth/user/user-api-slice-enhanced'

// The logic dependency is in the rtkQueryErrorLogger middleware
const initialState: UserInformation = {
  id: 0,
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  permissions: [],
  isAdmin: false,
  classes: [],
  docTypes: [],
  language: 'en',
  activePerspective: 0,
  perspectives: [],
  dateTimeLocale: '',
  welcomeScreen: false,
  memorizeTabs: false,
  hasImage: false,
  contentLanguages: [],
  keyBindings: []
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
