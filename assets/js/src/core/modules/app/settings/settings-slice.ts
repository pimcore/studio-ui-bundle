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
import { type SystemSettingsGetApiResponse } from '@Pimcore/modules/app/settings/settings-slice.gen'

const initialState: SystemSettingsGetApiResponse = {}

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (
      state,
      {
        payload: { ...props }
      }: PayloadAction<SystemSettingsGetApiResponse>
    ) => {
      state.settings = props
    }
  }
})

injectSliceWithState(slice)

export const { setSettings } = slice.actions

export const getSettings = (state: RootState): SystemSettingsGetApiResponse => state.settings.settings
