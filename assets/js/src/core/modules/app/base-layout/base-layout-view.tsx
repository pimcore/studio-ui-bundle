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
import { useTranslation } from 'react-i18next'

export const BaseLayoutView = (): React.JSX.Element => {
  const { styles } = useStlyes()
  const { t } = useTranslation()
  const adminSettings = useSelector(getAdminSettings)

  useEffect(() => {
    const root = document.documentElement

    if (isUndefined(adminSettings)) return

    const brandColor = adminSettings.branding.brandColor
    const brandBackgroundColor = adminSettings.branding.backgroundShade
    root.style.setProperty('--pimcore-brand-color', brandColor)
    root.style.setProperty('--pimcore-brand-background-color', brandBackgroundColor)
  }, [adminSettings])

  return (
    <div
      className={ ['base-layout', styles.baseLayout].join(' ') }
    >
      <a
        className={ styles.skipLink }
        href="#main-content"
      >
        {t('skip-to-content')}
      </a>

      <LeftSidebarView />

      <div
        id="main-content"
        tabIndex={ -1 }
      >
        <WidgetManagerContainer />
      </div>
      <ExecutionEngineNotification />

      <RightSidebarView />
    </div>
  )
}
