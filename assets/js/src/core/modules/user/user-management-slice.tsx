/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { EntityAdapter } from '@reduxjs/toolkit/src/entities/models'
import { createEntityAdapter, createSlice, type PayloadAction, type Update } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@sdk/app'
import { type UserGetAvailablePermissionsApiResponse, type UserPermission, type User } from '@Pimcore/modules/user/user-api-slice.gen'
import {
  type TrackableChangesDraft,
  useTrackableChangesReducers
} from '@Pimcore/modules/user/hooks/use-user-management-trackable-changes'

export interface UserDraft extends User, TrackableChangesDraft {
  password?: string
  image?: string
  modified: boolean
}

export const userAdapter: EntityAdapter<UserDraft, number> = createEntityAdapter<UserDraft>({})

export const slice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState({
    modified: false,
    activeId: undefined as number | undefined,
    changedIds: [] as number[],
    availablePermissions: [] as UserPermission[]
  }),
  reducers: {
    userOpened: (state, action: PayloadAction<number>): void => {
      state.activeId = action.payload
    },
    userClosed: (state, action: PayloadAction<number>): void => {
      state.activeId = undefined
      userAdapter.removeOne(state, action.payload)
    },
    userFetched: (state, action: PayloadAction<UserDraft>): void => {
      if (action.payload.id !== undefined) {
        userAdapter.upsertOne(state, { ...action.payload })
      }
    },
    userRemoved: (state, action: PayloadAction<number>): void => {
      userAdapter.removeOne(state, action.payload)
    },
    changeUser: (state, action: PayloadAction<{ id: any, changes: any }>): void => {
      const id: number = action.payload.id

      if (!state.changedIds.includes(id)) {
        state.changedIds.push(id)
      }

      const update: Update<any, any> = {
        id: action.payload.id,
        changes: { ...action.payload.changes, modified: true }
      }
      userAdapter.updateOne(state, update)
    },
    userImageLoaded: (state, action: PayloadAction<{ id: any, image: any }>): void => {
      const update: Update<any, any> = {
        id: action.payload.id,
        changes: { image: action.payload.image }
      }
      userAdapter.updateOne(state, update)
    },
    userUpdated: (state, action: PayloadAction<UserDraft>): void => {
      userAdapter.upsertOne(state, { ...action.payload })
    },
    userAvailablePermissionsFetched: (state, action: PayloadAction<UserGetAvailablePermissionsApiResponse>): void => {
      state.availablePermissions = action.payload.items
    },
    ...useTrackableChangesReducers(userAdapter)
  }
})

injectSliceWithState(slice)

export const {
  userRemoved,
  userOpened,
  userClosed,
  userFetched,
  userAvailablePermissionsFetched,
  changeUser,
  userImageLoaded,
  userUpdated
} = slice.actions

export const { selectById: selectUserById } = userAdapter.getSelectors((state: RootState) => state.user)
