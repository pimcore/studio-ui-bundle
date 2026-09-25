/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useAppSelector } from '@sdk/app'
import { selectIsAuthenticated } from '../../auth-slice'

export interface SessionScopeProps {
  children: React.ReactNode
}

/**
 * Remounts its children whenever an authenticated session ends, so no UI state of the
 * previous session survives on the login screen.
 *
 * The login screen replaces only what the router renders, but a lot of UI lives above the
 * router: the antd `App` holder (notifications, messages, `modal.confirm`), the modal
 * providers (site, upload, link, crop, ... and the modal holder), the element selector and
 * the tree clipboard. None of it unmounts when the guard swaps to the login screen, so an
 * open modal or popup stayed on top of it. Resetting the whole scope at once covers every
 * provider mounted there, including ones added later, instead of each having to tear its
 * own state down.
 *
 * Only the transition away from `true` resets. The initial check (`undefined` to `false`
 * or `true`) and a successful login keep the tree, so the URL the guard kept and the
 * login screen's own state are left alone.
 */
export const SessionScope = ({ children }: SessionScopeProps): React.JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const [previousIsAuthenticated, setPreviousIsAuthenticated] = useState(isAuthenticated)
  const [sessionKey, setSessionKey] = useState(0)

  if (previousIsAuthenticated !== isAuthenticated) {
    setPreviousIsAuthenticated(isAuthenticated)

    if (previousIsAuthenticated === true) {
      setSessionKey(key => key + 1)
    }
  }

  return (
    <React.Fragment key={ sessionKey }>
      {children}
    </React.Fragment>
  )
}
