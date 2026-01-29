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
import { injectSliceWithState, type RootState } from '@sdk/app'
import {
  type SystemSettingsGetApiResponse,
  type AdminSettings,
  api
} from '@Pimcore/modules/app/settings/settings-slice.gen'

interface SettingsState {
  settings?: SystemSettingsGetApiResponse
  adminSettings?: AdminSettings
}

const initialState: SettingsState = {}

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (
      state,
      {
        payload
      }: PayloadAction<SystemSettingsGetApiResponse>
    ) => {
      state.settings = payload
    },

    setAdminSettings: (
      state,
      { payload }: PayloadAction<AdminSettings>
    ) => {
      state.adminSettings = payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.adminSettingsGet.matchFulfilled,
      (state, { payload }) => {
        state.adminSettings = payload
      }
    )
  }
})

injectSliceWithState(slice)

export const { setSettings, setAdminSettings } = slice.actions

export const getSettings = (state: RootState): SystemSettingsGetApiResponse | undefined => state.settings.settings
export const getAdminSettings = (state: RootState): AdminSettings | undefined => state.settings.adminSettings
