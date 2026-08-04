/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@sdk/app'
import { studioThemeIds } from './constants/theme-ids'

export interface ThemeState {
  themeId: string
}

const initialState: ThemeState = {
  themeId: studioThemeIds.light
}

const slice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeId: (state, action: PayloadAction<string>) => {
      state.themeId = action.payload
    }
  }
})

injectSliceWithState(slice)

export const { setThemeId } = slice.actions

export const selectThemeId = (state: RootState): string => state.theme.themeId
