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
import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@sdk/app'
import { type UserInformation } from '@Pimcore/modules/auth/user/user-api-slice-enhanced'
import {useTrackableChangesReducers} from "@Pimcore/modules/auth/hooks/use-trackable-changes";
import type {EntityAdapter} from "@reduxjs/toolkit/src/entities/models";
import {UserDraft} from "@Pimcore/modules/user/user-slice";

export const authAdapter: EntityAdapter<UserDraft, number> = createEntityAdapter<UserDraft>({})

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
  activePerspective: '0',
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
  initialState: authAdapter.getInitialState({
    modified: false,
    changes: {},
    modifiedCells: {},
    ...initialState
  }),
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<UserInformation>
    ) => {
      return { ...state, ...payload }
    },

    userProfileUpdated: () => {
      console.log('User information updated')
    },

    ...useTrackableChangesReducers(authAdapter),
  }
})

export const userSliceName = slice.name

injectSliceWithState(slice)

export const {
  setUser,
  userProfileUpdated,
  resetChanges,
  setModifiedCells
} = slice.actions

export const selectCurrentUser = (state: RootState): UserInformation => state.auth
// export const {selectById: selectCurrentUser} = authAdapter.getSelectors((state: RootState) => state['auth'])
