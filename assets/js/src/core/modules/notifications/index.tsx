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
import { NotificationSettingsContainer } from './settings/notification-settings-container'
import { type WidgetManagerTabConfig } from '../widget-manager/widget-manager-slice'
import { type BackgroundProcessor } from '../background-processor/services/background-processor'
import { DemoProcess } from './process/demo-process'
import { staticWidgetRestorer } from '../widget-manager/services/static-widget-restorer'
import { type ComponentRegistry } from '../app/component-registry/component-registry'
import { NotificationPopup } from './notification-popup/notification-popup'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { type DynamicTypeNotificationChannelRegistry } from './dynamic-types/registry/dynamic-type-notification-channel-registry'
import { type DynamicTypeAbstractNotificationChannel } from './dynamic-types/definitions/dynamic-type-abstract-notification-channel'

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

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'notifications',
      component: NotificationsContainer
    })

    widgetRegistryService.registerWidget({
      name: 'notification-settings',
      component: NotificationSettingsContainer
    })

    staticWidgetRestorer.registerStaticWidget(NOTIFICATIONS)
    staticWidgetRestorer.registerStaticWidget(NOTIFICATION_SETTINGS)

    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
    componentRegistry.registerToSlot('global.feedback', {
      name: 'notification-popup',
      component: NotificationPopup
    })

    const BackgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    BackgroundProcessor.registerProcess(new DemoProcess())

    // Presentation for the channels shipped here. A bundle contributing its own channel
    // registers it the same way; one that does not still gets a column, with a generic icon.
    const channelRegistry = container.get<DynamicTypeNotificationChannelRegistry>(
      serviceIds['DynamicTypes/NotificationChannelRegistry']
    )

    channelRegistry.registerDynamicType(
      container.get<DynamicTypeAbstractNotificationChannel>(serviceIds['DynamicTypes/NotificationChannel/Popup'])
    )
    channelRegistry.registerDynamicType(
      container.get<DynamicTypeAbstractNotificationChannel>(serviceIds['DynamicTypes/NotificationChannel/Email'])
    )
  }
})
