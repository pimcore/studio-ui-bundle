/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect } from 'react'
import { LeftSidebarView } from './left-sidebar-view'
import { WidgetManagerContainer } from '@Pimcore/modules/widget-manager/widget-manager-container'
import { RightSidebarView } from './right-sidebar-view'
import { useStlyes } from './base-layout-view.styles'
import { Notification as ExecutionEngineNotification } from '@Pimcore/modules/execution-engine/notification/notification'
import { useSelector } from 'react-redux'
import { getAdminSettings } from '@Pimcore/modules/app/settings/settings-slice'
import { isUndefined } from 'lodash'

const LOADING_BRANDING_COLOR = '#C5C0CC'

export const BaseLayoutView = (): React.JSX.Element => {
  const { styles } = useStlyes()
  const adminSettings = useSelector(getAdminSettings)
  
  useEffect(() => {
    const root = document.documentElement
    
    if (isUndefined(adminSettings) || isUndefined(adminSettings.branding)) {
      root.style.setProperty('--pimcore-brand-color', LOADING_BRANDING_COLOR)
      root.style.setProperty('--pimcore-brand-background-color', LOADING_BRANDING_COLOR)
      return
    }

    const brandColor = adminSettings.branding.brandColor
    const brandBackgroundColor = adminSettings.branding.backgroundShade

    root.style.setProperty('--pimcore-brand-color', brandColor)
    root.style.setProperty('--pimcore-brand-background-color', brandBackgroundColor)
  }, [adminSettings])

  return (
    <div
      className={ ['base-layout', styles.baseLayout].join(' ') }
    >
      <LeftSidebarView />

      <WidgetManagerContainer />
      <ExecutionEngineNotification />

      <RightSidebarView />
    </div>
  )
}
