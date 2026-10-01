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
import { Icon } from '@Pimcore/components/icon/icon'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type ContextMenuItemProvider } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { useLogoutMutation } from './authorization-api-slice.gen'

export const logoutUserMenuItemProvider: ContextMenuItemProvider = {
  name: 'logout',
  priority: contextMenuConfig.userMenu.priority.logout,
  useMenuItem: () => {
    const { t } = useTranslation()
    const [logout] = useLogoutMutation()

    return {
      key: 'logout',
      label: t('user-menu.log-out'),
      icon: <Icon value={ 'log-out' } />,
      onClick: () => {
        logout().then(() => {
          window.location.reload()
        }).catch((error: Error) => {
          trackError(new ApiError(error))
        })
      }
    }
  }
}
