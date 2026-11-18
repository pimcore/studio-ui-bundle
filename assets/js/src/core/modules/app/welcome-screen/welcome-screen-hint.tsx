/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useNotification } from '@Pimcore/components/notification/useNotification'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { USERPROFILE } from '@Pimcore/modules/auth/profile/profile-container'

const HINT_KEY = 'welcome-screen-hint'

export const useWelcomeScreenHint = (): ((options: { hasDashboards: boolean }) => void) => {
  const { t } = useTranslation()
  const [notificationApi] = useNotification()
  const { openMainWidget } = useWidgetManager()

  return ({ hasDashboards }) => {
    notificationApi.open({
      key: HINT_KEY,
      message: t('welcome-screen.hint.title'),
      description: t(hasDashboards ? 'welcome-screen.hint.select-dashboard' : 'welcome-screen.hint.no-dashboard'),
      btn: (
        <Button
          onClick={ () => {
            openMainWidget(USERPROFILE)
            notificationApi.destroy(HINT_KEY)
          } }
          size="small"
          type="primary"
        >
          {t('welcome-screen.hint.open-profile')}
        </Button>
      )
    })
  }
}
