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
