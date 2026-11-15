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
import { NotificationsWidget } from './notifications-widget'
import { type BackgroundProcessor } from '../background-processor/services/background-processor'
import { DemoProcess } from './process/demo-process'
import { staticWidgetRestorer } from '../widget-manager/services/static-widget-restorer'
import { type ComponentRegistry } from '../app/component-registry/component-registry'
import { contextMenuConfig } from '../app/context-menu-registry/context-menu-config'
import { type ContextMenuRegistryInterface } from '../app/context-menu-registry/context-menu-registry'
import { notificationsUserMenuItemProvider } from './user-menu-item'
import { NotificationPopup } from './notification-popup/notification-popup'
import { type DynamicTypeNotificationChannelRegistry } from './dynamic-types/registry/dynamic-type-notification-channel-registry'
import { type DynamicTypeAbstractNotificationChannel } from './dynamic-types/definitions/dynamic-type-abstract-notification-channel'

import { NOTIFICATIONS } from './widget-configs'

export { NOTIFICATIONS } from './widget-configs'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    // The inbox and the subscription preferences are sections of this one widget.
    widgetRegistryService.registerWidget({
      name: 'notifications',
      component: NotificationsWidget
    })

    staticWidgetRestorer.registerStaticWidget(NOTIFICATIONS)

    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
    componentRegistry.registerToSlot('global.feedback', {
      name: 'notification-popup',
      component: NotificationPopup
    })

    container
      .get<ContextMenuRegistryInterface>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])
      .registerToSlot(contextMenuConfig.userMenu.name, notificationsUserMenuItemProvider)

    const BackgroundProcessor = container.get<BackgroundProcessor>(serviceIds.backgroundProcessor)
    BackgroundProcessor.registerProcess(new DemoProcess())

    // Presentation for the channels shipped here; a bundle registers its own the same way.
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
