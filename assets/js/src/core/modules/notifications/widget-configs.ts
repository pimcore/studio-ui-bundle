/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { type WidgetManagerTabConfig } from '../widget-manager/widget-manager-slice'

// Kept out of the module barrel so the user-menu provider can read them without an import cycle.
export const NOTIFICATIONS: WidgetManagerTabConfig = {
  component: 'notifications',
  name: 'Notifications',
  id: 'notifications',
  permission: UserPermission.Notifications,
  config: {
    translationKey: 'notifications.label',
    icon: {
      type: 'name',
      value: 'notification-read'
    }
  }
}

export const NOTIFICATION_SETTINGS: WidgetManagerTabConfig = {
  component: 'notification-settings',
  name: 'Notification settings',
  id: 'notification-settings',
  permission: UserPermission.Notifications,
  config: {
    translationKey: 'notifications.settings.label',
    icon: {
      type: 'name',
      value: 'settings'
    }
  }
}
