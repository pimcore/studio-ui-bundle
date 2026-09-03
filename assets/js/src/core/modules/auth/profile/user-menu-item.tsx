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
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type ContextMenuItemProvider } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { useWidgetManager } from '@Pimcore/modules/widget-manager/hooks/use-widget-manager'
import { USERPROFILE } from './profile-container'

export const profileUserMenuItemProvider: ContextMenuItemProvider = {
  name: 'myProfile',
  priority: contextMenuConfig.userMenu.priority.myProfile,
  useMenuItem: () => {
    const { t } = useTranslation()
    const { openMainWidget } = useWidgetManager()

    return {
      key: 'myprofile',
      label: t('user-menu.my-profile'),
      icon: <Icon value={ 'user' } />,
      onClick: () => { openMainWidget(USERPROFILE) }
    }
  }
}
