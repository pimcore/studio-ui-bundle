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
import { type UserPermission } from '@Pimcore/modules/auth/user/user-api-slice.gen'

interface InitialStateProps {
  permissions: UserPermission[]
}

const initialState: InitialStateProps = {
  permissions: []
}

const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setPermissions: (
      state,
      {
        payload: { ...props }
      }: PayloadAction<UserPermission[]>
    ) => {
      state.permissions = props
    }
  }
})

injectSliceWithState(slice)

export const { setPermissions } = slice.actions

export const getPermissions = (state: RootState): UserPermission[] => state.permissions.permissions
