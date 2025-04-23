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
import type { DetailedUserRole } from '@Pimcore/modules/user/roles/roles-api-slice.gen'

export interface IRole extends DetailedUserRole {
  modified: boolean
}

export const roleAdapter: EntityAdapter<IRole, number> = createEntityAdapter<IRole>({})

export const slice = createSlice({
  name: 'role',
  initialState: roleAdapter.getInitialState({
    modified: false,
    activeId: undefined as number | undefined,
    changedIds: [] as number[]
  }),
  reducers: {
    roleOpened: (state, action: PayloadAction<number>): void => {
      state.activeId = action.payload
    },
    roleClosed: (state, action: PayloadAction<number>): void => {
      state.activeId = undefined
      roleAdapter.removeOne(state, action.payload)
    },
    roleFetched: (state, action: PayloadAction<any>): void => {
      if (action.payload.id !== undefined) {
        roleAdapter.upsertOne(state, action)
      }
    },
    roleRemoved: (state, action: PayloadAction<number>): void => {
      roleAdapter.removeOne(state, action.payload)
    },
    changeRole: (state, action: PayloadAction<{ id: any, changes: any }>): void => {
      const id: number = action.payload.id

      if (!state.changedIds.includes(id)) {
        state.changedIds.push(id)
      }

      const update: Update<any, any> = {
        id: action.payload.id,
        changes: { ...action.payload.changes, modified: true }
      }

      roleAdapter.updateOne(state, update)
    },
    roleUpdated: (state, action: PayloadAction<number>): void => {
      state.changedIds = state.changedIds.filter((role) => role !== action.payload)
      const update: Update<any, any> = {
        id: action.payload,
        changes: { modified: false }
      }

      roleAdapter.updateOne(state, update)
    }
  }
})

injectSliceWithState(slice)

export const {
  roleRemoved,
  roleOpened,
  roleClosed,
  roleFetched,
  roleUpdated,
  changeRole
} = slice.actions

export const { selectById: selectRoleById } = roleAdapter.getSelectors((state: RootState) => state.role)
