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
import { useAppDispatch, useAppSelector } from '@sdk/app'
import { openMainWidget, selectWidgetManagerRestored } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useMainNav } from '@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav'
import { findWelcomeScreenNavItem } from './welcome-screen-nav-items'
import { isWelcomeScreenHandled, markWelcomeScreenHandled } from './welcome-screen-session'

export const useWelcomeScreen = (): void => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const user = useUser()
  const { navItems } = useMainNav()
  // opened after the restore, so it becomes the active tab in front of the tabs of the previous session
  const isWidgetManagerRestored = useAppSelector(selectWidgetManagerRestored)

  useEffect(() => {
    if (!isWidgetManagerRestored || isWelcomeScreenHandled()) {
      return
    }

    markWelcomeScreenHandled()

    // useHandleDeepLink opens the target of an element or reset-password link instead
    const isLinkLogin = location?.state?.isDeeplink === true || location?.state?.resetPassword === true

    if (!user.welcomeScreen || isLinkLogin) {
      return
    }

    const item = findWelcomeScreenNavItem(navItems, user.welcomeScreenDashboardId)

    if (!isNil(item?.widgetConfig)) {
      dispatch(openMainWidget(item.widgetConfig))
    }
  }, [isWidgetManagerRestored])
}
