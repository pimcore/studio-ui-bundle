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

import { injectSliceWithState, type RootState } from '@Pimcore/app/store'
import { createSlice } from '@reduxjs/toolkit'
import { remove } from 'lodash'

const initialState: string[] = []

const slice = createSlice({
  name: 'missingTranslations',
  initialState,
  reducers: {
    addMissingTranslation: (state, { payload }) => {
      state.push(payload as string)
    },
    removeMissingTranslation: (state, { payload }) => {
      remove(state, payload as string)
    }
  }
})

export const missingTranslationsSliceName = slice.name

injectSliceWithState(slice)

export const { addMissingTranslation, removeMissingTranslation } = slice.actions

export const selectMissingTranslations = (state: RootState): string[] => state.missingTranslations
