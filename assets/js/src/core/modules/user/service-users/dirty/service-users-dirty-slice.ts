/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */


import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type RootState, injectSliceWithState } from '@Pimcore/app/store'

interface ServiceUsersDirtyState {
  /** Whether any service user opened in the Service Users widget has unsaved edits. Drives the widget tab's "*" and its close confirmation. */
  dirty: boolean
}

const initialState: ServiceUsersDirtyState = { dirty: false }

export const serviceUsersDirtySlice = createSlice({
  name: 'service-users-dirty',
  initialState,
  reducers: {
    setServiceUsersDirty (state, action: PayloadAction<boolean>): void {
      state.dirty = action.payload
    }
  }
})

export const { setServiceUsersDirty } = serviceUsersDirtySlice.actions

export const selectServiceUsersDirty = (state: RootState): boolean =>
  (state['service-users-dirty'] as ServiceUsersDirtyState | undefined)?.dirty ?? false

injectSliceWithState(serviceUsersDirtySlice)
