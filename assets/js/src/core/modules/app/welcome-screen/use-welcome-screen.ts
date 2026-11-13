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
import { type IJsonModel, Model } from 'flexlayout-react'
import { isNil } from 'lodash'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@sdk/app'
import {
  openMainWidget,
  selectInnerModel,
  selectWidgetManagerRestored
} from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'
import { useMainNav } from '@Pimcore/modules/app/base-layout/main-nav/hooks/use-main-nav'
import { getWelcomeScreenNavItems } from './welcome-screen-nav-items'

const hasTabs = (innerModel: IJsonModel): boolean => {
  let found = false

  Model.fromJson(innerModel).visitNodes((node) => {
    if (node.getType() === 'tab') {
      found = true
    }
  })

  return found
}

export const useWelcomeScreen = (): void => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const user = useUser()
  const { navItems } = useMainNav()
  const innerModel = useAppSelector(selectInnerModel)
  // the welcome screen must only open into the layout left after the restore of the previous session
  const isWidgetManagerRestored = useAppSelector(selectWidgetManagerRestored)

  useEffect(() => {
    // useHandleDeepLink opens the target of an element or reset-password link instead
    const isLinkLogin = location?.state?.isDeeplink === true || location?.state?.resetPassword === true

    if (!isWidgetManagerRestored || !user.welcomeScreen || isLinkLogin || hasTabs(innerModel)) {
      return
    }

    const item = getWelcomeScreenNavItems(navItems).find((navItem) => navItem.path === user.welcomeScreenPath)

    if (!isNil(item?.widgetConfig)) {
      dispatch(openMainWidget(item.widgetConfig))
    }
  }, [isWidgetManagerRestored])
}
