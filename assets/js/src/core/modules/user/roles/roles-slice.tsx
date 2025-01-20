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
    itemOpened: (state, action: PayloadAction<number>): void => {
      state.activeId = action.payload
    },
    itemClosed: (state, action: PayloadAction<number>): void => {
      state.activeId = undefined
      roleAdapter.removeOne(state, action.payload)
    },
    itemFetched: (state, action: PayloadAction<any>): void => {
      console.log('itemFetched', action.payload)
      if (action.payload.id !== undefined) {
        roleAdapter.upsertOne(state, action)
      }
    },
    removeItem: (state, action: PayloadAction<number>): void => {
      roleAdapter.removeOne(state, action.payload)
    },
    changeItem: (state, action: PayloadAction<{ id: any, changes: any, type?: string }>): void => {
      const id: number = action.payload.id

      if (!state.changedIds.includes(id)) {
        state.changedIds.push(id)
      }

      const update: Update<any, any> = {
        id: action.payload.id,
        changes: { ...action.payload.changes, modified: true }
      }

      if (action.payload.type !== undefined) {
        const type = action.payload.type
        update.changes[type] = action.payload.changes
      }

      roleAdapter.updateOne(state, update)
    },
    itemReloaded: (state, action: PayloadAction<number>): void => {
      const id: number = action.payload

      const update: Update<any, any> = {
        id,
        changes: { modified: false }
      }
      state.changedIds = state.changedIds.filter((item) => item !== id)

      roleAdapter.updateOne(state, update)
    },
    itemUpdated: (state, action: PayloadAction<any>): void => {
      roleAdapter.upsertOne(state, { ...action })
    }
  }
})

injectSliceWithState(slice)

export const {
  removeItem,
  itemOpened,
  itemClosed,
  itemFetched,
  itemReloaded,
  changeItem,
  itemUpdated
} = slice.actions

export const { selectById: selectRoleById } = roleAdapter.getSelectors((state: RootState) => state.role)
