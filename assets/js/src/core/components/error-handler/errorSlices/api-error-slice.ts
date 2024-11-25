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
import { type IApiErrorData } from '@Pimcore/app/store/middleware/rtkQueryErrorLogger'

interface IPayloadData {
  errorData: IApiErrorData
}

const INITIAL_STATE = {
  errorData: null
}

const slice = createSlice({
  name: 'apiError',
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action) => {
      state.errorData = action.payload
    },
    clear: (state) => {
      state.errorData = null
    }
  }
})

injectSliceWithState(slice)

export const selectErrorData = (state: { apiError: IPayloadData }): IPayloadData['errorData'] =>
  state.apiError.errorData

export const { add, clear } = slice.actions
export default slice.reducer
