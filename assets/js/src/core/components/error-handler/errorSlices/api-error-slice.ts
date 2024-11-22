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

import { createSlice } from '@reduxjs/toolkit'
import { injectSliceWithState } from '@Pimcore/app/store'

const INITIAL_STATE = {
  message: null
}

const slice = createSlice({
  name: 'apiError',
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action) => {
      state.message = action.payload
    },
    clear: (state) => {
      state.message = null
    }
  },
  selectors: {
    selectErrorMessage: (state) => {
      return state.message
    }
  }
})

injectSliceWithState(slice)

export const { add, clear } = slice.actions
export const { selectErrorMessage } = slice.selectors

export default slice.reducer
