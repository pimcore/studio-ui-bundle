/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import { isNil } from 'lodash'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@sdk/app'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { selectWidgetManagerRestored } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { type WelcomeScreenRegistry } from './services/welcome-screen-registry'
import { isWelcomeScreenHandled, markWelcomeScreenHandled } from './welcome-screen-session'
import { useWelcomeScreenHint } from './welcome-screen-hint'

export const useWelcomeScreen = (): void => {
  const location = useLocation()
  const user = useUser()
  const showHint = useWelcomeScreenHint()
  // opened after the restore, so it becomes the active tab in front of the tabs of the previous session
  const isWidgetManagerRestored = useAppSelector(selectWidgetManagerRestored)

  useEffect(() => {
    if (!isWidgetManagerRestored || isWelcomeScreenHandled(user.id)) {
      return
    }

    markWelcomeScreenHandled(user.id)

    // useHandleDeepLink opens the target of an element or reset-password link instead
    const isLinkLogin = location?.state?.isDeeplink === true || location?.state?.resetPassword === true

    if (!user.welcomeScreen || isLinkLogin) {
      return
    }

    const registry = container.get<WelcomeScreenRegistry>(serviceIds['WelcomeScreen/Registry'])
    const dashboardId = user.welcomeScreenDashboardId

    if (!isNil(dashboardId) && dashboardId !== '' && registry.open(dashboardId)) {
      return
    }

    // a backend without the field cannot store a choice, so there is nothing to ask for
    if (dashboardId !== undefined) {
      showHint({ hasDashboards: registry.getOptions().length > 0 })
    }
  }, [isWidgetManagerRestored])
}
