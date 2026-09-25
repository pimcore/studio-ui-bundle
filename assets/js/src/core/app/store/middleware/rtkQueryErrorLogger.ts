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
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import type { UserInformation } from '@Pimcore/modules/auth/user/user-api-slice.gen'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { isSessionGone } from '@Pimcore/modules/auth/util/session-end'

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
  theme: 'default',
  hasImage: false,
  contentLanguages: [],
  keyBindings: [],
  allowedLanguagesForEditingWebsiteTranslations: [],
  allowedLanguagesForViewingWebsiteTranslations: [],
  allowDirtyClose: false,
  twoFactorAuthentication: {
    enabled: false,
    required: false,
    type: '',
    active: false
  }
}

/**
 * Whether a failed request went to Studio's own API, which answers 401 only without a session.
 * Decided from the request itself: the action has to be passed on or dropped right away,
 * because callers read the result from the store as soon as the request settles. A request
 * without a known URL (e.g. a `queryFn` endpoint) counts as Studio's, as every 401 did before.
 */
const isStudioApiRequest = (meta: unknown): boolean => {
  const url = (meta as { baseQueryMeta?: { request?: Request } } | undefined)?.baseQueryMeta?.request?.url

  if (url === undefined) {
    return true
  }

  try {
    const { origin, pathname } = new URL(url, globalThis.location.origin)
    const prefix = getPrefix()

    return origin === globalThis.location.origin && (pathname === prefix || pathname.startsWith(`${prefix}/`))
  } catch {
    return true
  }
}

const logOut = (dispatch: MiddlewareAPI['dispatch']): void => {
  dispatch({ type: 'auth/setUser', payload: initialState })
  dispatch({ type: 'authentication/setAuthState', payload: false })
}

export const rtkQueryErrorLogger: Middleware =
  (api) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      const payload = action.payload as ErrorPayload
      const actionMetaArgs = action.meta?.arg as any

      // Handle the case when the user's session has expired and further requests return a 401 status.
      if (payload?.status === 401) {
        if ('endpointName' in actionMetaArgs && actionMetaArgs.endpointName === 'userGetCurrentInformation') {
          return next(action)
        }

        // Extensions share this API but not always Studio's session: an external service (e.g.
        // an agent server) answers 401 when its own check fails while the Studio session is
        // fine. Such a request just failed, so its action goes on like any other error. Its
        // 401 may still stem from an expired session, so the server is asked in the background.
        if (!isStudioApiRequest(action.meta)) {
          void isSessionGone().then(gone => {
            if (gone) {
              logOut(api.dispatch)
            }
          })

          return next(action)
        }

        logOut(api.dispatch)

        // Need to prevent further handling of the error to avoid triggering the error boundary etc.
        return
      }
    }

    return next(action)
  }
