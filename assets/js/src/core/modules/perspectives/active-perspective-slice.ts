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
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { type PerspectiveConfigDetail } from './perspectives-slice.gen'

const slice = createSlice({
  name: 'activePerspective',
  initialState: null as PerspectiveConfigDetail | null,
  reducers: {
    setActivePerspective: (
      state,
      { payload }: PayloadAction<PerspectiveConfigDetail>
    ) => {
      return payload
    }
  }
})

export const activePerspectiveSliceName = slice.name

injectSliceWithState(slice)

export const { setActivePerspective } = slice.actions

export const selectActivePerspective = (state: RootState): PerspectiveConfigDetail | null => state.activePerspective
