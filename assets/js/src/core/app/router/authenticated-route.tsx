/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { LoginPage } from '@Pimcore/modules/auth/login-page'
import React from 'react'

/**
 * Renders the login screen at the guarded route's own URL rather than sending the browser
 * to `routes.login`, so the address bar still reads the page that was asked for.
 *
 * That address is the only thing that survives a login which leaves the application. A
 * `<Navigate>` here rewrote it to `/login`, leaving the intended target in React Router's
 * in-memory `location.state`: enough for the password form, which never leaves the SPA,
 * and gone the moment an external identity provider is involved, because that is a full
 * page navigation. The OpenID Connect login reads the target from the `Referer` of the
 * request that starts it, and with the address rewritten that header named the login page,
 * so a user who authorized an OAuth client and signed in through their provider came back
 * to Studio's start page and the consent screen was never reached.
 *
 * Deliberately not solved by carrying the target in a query parameter: a redirect target
 * that travels through a URL has to be validated on the way back, and the parameter is a
 * surface the login screen does not otherwise have. Not moving is what removes the problem.
 */
export const AuthenticatedRoute = ({ children }: { children: React.JSX.Element }): React.ReactElement => {
  const { isAuthenticated } = useIsAuthenticated()

  return (
    <>
      {isAuthenticated === true && children}
      {isAuthenticated === false && <LoginPage inPlace />}
    </>
  )
}
