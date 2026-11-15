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

/** The widget's section tabs. */
export type NotificationsSection = 'inbox' | 'settings'

export interface NotificationsSectionRequest {
  section: NotificationsSection
  /** Bumped every request, so asking for a section the user has since left re-selects it. */
  token: number
}

interface NotificationsUiState {
  expandRequest: ExpandNotificationRequest | null
  sectionRequest: NotificationsSectionRequest | null
}

const initialState: NotificationsUiState = {
  expandRequest: null,
  sectionRequest: null
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
    },
    // Acknowledges a consumed request so a later remount of the same row does not re-expand it.
    clearExpandRequest: (state) => {
      state.expandRequest = null
    },
    requestNotificationsSection: (state, action: PayloadAction<NotificationsSection>) => {
      state.sectionRequest = {
        section: action.payload,
        token: (state.sectionRequest?.token ?? 0) + 1
      }
    },
    // Consumed once the tabs have switched, so the user can move tabs by hand afterwards.
    clearNotificationsSectionRequest: (state) => {
      state.sectionRequest = null
    }
  },
  selectors: {
    selectExpandRequest: (state: NotificationsUiState) => state.expandRequest,
    selectSectionRequest: (state: NotificationsUiState) => state.sectionRequest
  }
})

injectSliceWithState(notificationsUiSlice)

/** Exported for testing the token progression. */
export const notificationsUiReducer = notificationsUiSlice.reducer
export const {
  requestExpandNotification,
  clearExpandRequest,
  requestNotificationsSection,
  clearNotificationsSectionRequest
} = notificationsUiSlice.actions
export const { selectExpandRequest, selectSectionRequest } = notificationsUiSlice.getSelectors(
  (state: RootState) => state['notifications-ui']
)
