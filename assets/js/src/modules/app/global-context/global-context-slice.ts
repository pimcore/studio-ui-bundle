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

import { type RootState, injectSliceWithState } from '@Pimcore/app/store'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface GlobalContext {
  type: string
  config: Record<string, unknown>
}

const initialState: GlobalContext[] = []

const globalContextSlice = createSlice({
  name: 'global-context',
  initialState,
  reducers: {
    addGlobalContext: (state, action: PayloadAction<GlobalContext>) => {
      state.push(action.payload)
    },

    removeGlobalContext: (state, action: PayloadAction<string>) => {
      return state.filter((context) => context.type !== action.payload)
    }
  },

  selectors: {
    selectContextByType: (state, type: string) => {
      return state.find((context) => context.type === type)
    }
  }
})

injectSliceWithState(globalContextSlice)

export const { addGlobalContext, removeGlobalContext } = globalContextSlice.actions
export const { selectContextByType } = globalContextSlice.getSelectors((state: RootState) => state['global-context'])
