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

// Out of the barrel to avoid a cycle with the user-menu provider.
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

