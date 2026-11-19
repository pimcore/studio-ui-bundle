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
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@sdk/app'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { selectWidgetManagerRestored } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'
import { type WelcomeScreenRegistry } from '../services/welcome-screen-registry'
import { isWelcomeScreenHandled, markWelcomeScreenHandled } from '../utils/welcome-screen-session'

export const useWelcomeScreen = (): void => {
  const location = useLocation()
  const user = useUser()
  // opened after the restore, so it becomes the active tab in front of the tabs of the previous session
  const isWidgetManagerRestored = useAppSelector(selectWidgetManagerRestored)

  useEffect(() => {
    if (!isWidgetManagerRestored || isWelcomeScreenHandled(user.id)) {
      return
    }

    markWelcomeScreenHandled(user.id)

    // useHandleDeepLink opens the target of an element or reset-password link instead
    const isLinkLogin = location?.state?.isDeeplink === true || location?.state?.resetPassword === true

    if (user.welcomeScreen && !isLinkLogin && isNonEmptyString(user.welcomeScreenTarget)) {
      container.get<WelcomeScreenRegistry>(serviceIds['WelcomeScreen/Registry']).open(user.welcomeScreenTarget)
    }
  }, [isWidgetManagerRestored])
}
