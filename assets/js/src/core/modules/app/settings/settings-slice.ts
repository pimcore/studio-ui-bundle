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
