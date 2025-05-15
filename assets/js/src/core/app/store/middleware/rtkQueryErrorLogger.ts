/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'
import type { UserInformation } from '@Pimcore/modules/auth/user/user-api-slice.gen'

interface ErrorPayload {
  status?: number
  data?: {
    error: string
  }
}

// Cannot use directly from the slice
// Middleware doesn't have direct access to the state management logic defined in slices
const initialState: UserInformation = {
  id: 0,
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  permissions: [],
  isAdmin: false,
  classes: [],
  docTypes: [],
  language: 'en',
  activePerspective: 0,
  perspectives: [],
  language: 'en',
  dateTimeLocale: '',
  welcomeScreen: false,
  memorizeTabs: false,
  hasImage: false,
  contentLanguages: [],
  keyBindings: []
}

export const rtkQueryErrorLogger: Middleware =
  (api) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const payload = action.payload as ErrorPayload

      // Handle the case when the user's session has expired and further requests return a 401 status.
      if (payload?.status === 401) {
        api.dispatch({ type: 'auth/setUser', payload: initialState })

        // Need to prevent further handling of the error to avoid triggering the error boundary etc.
        return
      }
    }

    return next(action)
  }
