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

import type { EntityAdapter } from '@reduxjs/toolkit/src/entities/models'
import { createEntityAdapter, createSlice, type PayloadAction, type Update } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { type UserGetAvailablePermissionsApiResponse, type UserPermission, type User } from '@Pimcore/modules/user/user-api-slice.gen'
import {
  type TrackableChangesDraft,
  useTrackableChangesReducers
} from '@Pimcore/modules/user/hooks/use-user-trackable-changes'

export interface UserDraft extends User, TrackableChangesDraft {
  password?: string
}

export const userAdapter: EntityAdapter<UserDraft, number> = createEntityAdapter<UserDraft>({})

export const slice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState({
    modified: false,
    activeId: undefined as number | undefined,
    changedIds: [] as number[],
    availablePermissions: [] as UserPermission[],
    changes: {},
    modifiedCells: {}
  }),
  reducers: {
    userOpened: (state, action: PayloadAction<number>): void => {
      state.activeId = action.payload
    },
    userClosed: (state, action: PayloadAction<number>): void => {
      state.activeId = undefined
      userAdapter.removeOne(state, action.payload)
    },
    userFetched: (state, action: PayloadAction<any>): void => {
      if (action.payload.id !== undefined) {
        userAdapter.upsertOne(state, action)
      }
    },
    removeUser: (state, action: PayloadAction<number>): void => {
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
    userReloaded: (state, action: PayloadAction<number>): void => {
      const id: number = action.payload

      const update: Update<any, any> = {
        id,
        changes: { modified: false }
      }
      state.changedIds = state.changedIds.filter((item) => item !== id)

      userAdapter.updateOne(state, update)
    },
    userUpdated: (state, action: PayloadAction<any>): void => {
      userAdapter.upsertOne(state, { ...action })
    },
    userAvailablePermissionsFetched: (state, action: PayloadAction<UserGetAvailablePermissionsApiResponse>): void => {
      state.availablePermissions = action.payload.items
    },
    userUpdateWorkspaces: (state, action: PayloadAction<any>): void => {
      const type = action.payload.type
      const id: number = action.payload.id

      if (!state.changedIds.includes(id)) {
        state.changedIds.push(id)
      }

      if (type === 'assets') {
        const update: Update<any, any> = {
          id,
          changes: { assetWorkspaces: action.payload.changes, modified: true }
        }
        userAdapter.updateOne(state, update)
      } else if (type === 'documents') {
        const update: Update<any, any> = {
          id,
          changes: { documentWorkspaces: action.payload.changes, modified: true }
        }
        userAdapter.updateOne(state, update)
      } else if (type === 'objects') {
        const update: Update<any, any> = {
          id,
          changes: { dataObjectWorkspaces: action.payload.changes, modified: true }
        }
        userAdapter.updateOne(state, update)
      }
    },
    ...useTrackableChangesReducers(userAdapter)
  }
})

injectSliceWithState(slice)

export const {
  removeUser,
  userOpened,
  userClosed,
  userFetched,
  userReloaded,
  userAvailablePermissionsFetched,
  changeUser,
  userUpdated,
  userUpdateWorkspaces
} = slice.actions

export const { selectById: selectUserById } = userAdapter.getSelectors((state: RootState) => state.user)
