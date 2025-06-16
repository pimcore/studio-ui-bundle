/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { NotificationsContainer } from './notifications-container'
import { type WidgetManagerTabConfig } from '../widget-manager/widget-manager-slice'
import { type BackgroundProcessor } from '../background-processor/services/background-processor'
import { DemoProcess } from './process/demo-process'
import { type ComponentRegistry } from '../app/component-registry/component-registry'
import { NotificationUpdates } from './notification-updates'

export const NOTIFICATIONS: WidgetManagerTabConfig = {
  component: 'notifications',
  name: 'Notifications',
  id: 'notifications',
  config: {
    translationKey: 'notifications.label',
    icon: {
      type: 'name',
      value: 'notification-read'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'notifications',
      component: NotificationsContainer
    })

    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
    componentRegistry.registerToSlot('global.feedback', {
      name: 'notifications',
      component: NotificationUpdates
    })

    const BackgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    BackgroundProcessor.registerProcess(new DemoProcess())
  }
})
