/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect, useRef } from 'react'
import { useAppSelector } from '@sdk/app'
import { selectIsAuthenticated } from '../../auth-slice'
import { isSessionGone, reloadPage } from '../../util/session-end'

/**
 * Reloads the page when an authenticated session ends (e.g. an API call answered 401), so
 * nothing of the previous session outlives it: open modals and popups held above the
 * router, the redux store with its API cache, the message bus subscription of the previous
 * user, module-level singletons and plugin state.
 *
 * The reload keeps the address, so the route guard renders the login screen in place at
 * the URL the user was on, exactly as without the reload. Logging out and the login form
 * reload the page as well.
 *
 * The state is set to `false` on a 401 from Studio's API, and by other code as well (e.g. the
 * OAuth consent screen on a 401 of its own endpoint). A reload on a still-valid session would
 * hit the same failure on every boot and never stop, so the server has to confirm the session
 * is gone first. When it does not, nothing is reloaded and the login screen stays as before.
 *
 * Only the change away from `true` counts. The initial check after a boot goes from
 * `undefined` to `false` or `true`, so a reload cannot trigger another one.
 */
export const ReloadOnSessionEnd = (): null => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const wasAuthenticatedRef = useRef(false)

  useEffect(() => {
    const sessionEnded = wasAuthenticatedRef.current && isAuthenticated !== true
    wasAuthenticatedRef.current = isAuthenticated === true

    if (!sessionEnded) {
      return
    }

    void isSessionGone().then(gone => {
      if (gone) {
        reloadPage()
      }
    })
  }, [isAuthenticated])

  return null
}
