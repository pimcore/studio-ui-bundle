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
  activePerspective: '0',
  perspectives: [],
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
      const actionMetaArgs = action.meta?.arg as any

      // Handle the case when the user's session has expired and further requests return a 401 status.
      // @todo - check if we can bind it to another endpoint that is specific to the user session
      if (payload?.status === 401) {
        if ('endpointName' in actionMetaArgs && actionMetaArgs.endpointName === 'userGetCurrentInformation') {
          return next(action)
        }

        api.dispatch({ type: 'auth/setUser', payload: initialState })
        api.dispatch({ type: 'authentication/setAuthState', payload: false })

        // Need to prevent further handling of the error to avoid triggering the error boundary etc.
        return
      }
    }

    return next(action)
  }
