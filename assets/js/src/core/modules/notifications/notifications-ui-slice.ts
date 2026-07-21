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
  /**
   * Bumped on every request so that viewing the same notification again — after collapsing it
   * by hand — still registers as a change and re-expands it. Without it a repeat request would
   * carry an identical value and the subscribing rows would see no change.
   */
  token: number
}

interface NotificationsUiState {
  expandRequest: ExpandNotificationRequest | null
}

const initialState: NotificationsUiState = {
  expandRequest: null
}

/**
 * UI-only state for the notifications module. It exists because the widget container memoises
 * its rendered component, so an already-open notifications widget cannot be told which row to
 * expand through its config — the rows read this signal live instead.
 */
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
