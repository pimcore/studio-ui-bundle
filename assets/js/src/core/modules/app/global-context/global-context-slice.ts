/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type RootState, injectSliceWithState } from '@sdk/app'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface GlobalContext {
  type: string
  config: Record<string, unknown>
}

export interface GlobalDefaultContext {
  type: 'default'
  widgetId: string
}

export type GlobalContextUnion = GlobalContext | GlobalDefaultContext

type GlobalContextState = GlobalContextUnion | null

const initialState: GlobalContextState = null

const globalContextSlice = createSlice({
  name: 'global-context',
  initialState: initialState as GlobalContextState,
  reducers: {
    addGlobalContext: (state, action: PayloadAction<GlobalContext>) => {
      return action.payload
    },

    removeGlobalContext: (state, action: PayloadAction<string>) => {
      return null
    },

    setGlobalDefaultContext: (state, action: PayloadAction<GlobalDefaultContext>) => {
      return action.payload
    }
  },

  selectors: {
    selectContextByType: (state: GlobalContextState, type: string) => {
      return state?.type === type ? state : null
    }
  }
})

injectSliceWithState(globalContextSlice)

export const { addGlobalContext, removeGlobalContext, setGlobalDefaultContext } = globalContextSlice.actions
export const { selectContextByType } = globalContextSlice.getSelectors((state: RootState) => state['global-context'])
