/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'

export const NOTIFICATIONS: WidgetManagerTabConfig = {
  component: 'notifications',
  name: 'Notifications',
  id: 'notifications',
  config: {
    translationKey: 'notifications.label',
    icon: {
      type: 'name',
      value: 'notification'
    }
  }
}
