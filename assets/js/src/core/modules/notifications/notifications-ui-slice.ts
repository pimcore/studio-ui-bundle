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

export interface ExpandNotificationRequest {
  id: number
  /** Bumped every request, so viewing the same notification twice still re-expands it. */
  token: number
}

interface NotificationsUiState {
  expandRequest: ExpandNotificationRequest | null
}

const initialState: NotificationsUiState = {
  expandRequest: null
}

// The widget container memoises its rendered component, so an already-open widget cannot be told
// which row to expand through its config; the rows read this signal live instead.
const notificationsUiSlice = createSlice({
  name: 'notifications-ui',
  initialState,
  reducers: {
    requestExpandNotification: (state, action: PayloadAction<number>) => {
      state.expandRequest = {
        id: action.payload,
        token: (state.expandRequest?.token ?? 0) + 1
      }
    }
  },
  selectors: {
    selectExpandRequest: (state: NotificationsUiState) => state.expandRequest
  }
})

injectSliceWithState(notificationsUiSlice)

/** Exported for testing the token progression. */
export const notificationsUiReducer = notificationsUiSlice.reducer
export const { requestExpandNotification } = notificationsUiSlice.actions
export const { selectExpandRequest } = notificationsUiSlice.getSelectors(
  (state: RootState) => state['notifications-ui']
)
