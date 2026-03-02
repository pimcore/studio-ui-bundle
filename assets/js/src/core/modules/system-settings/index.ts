/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { SystemSettingsContainer } from './system-settings-container'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'system-settings',
      component: SystemSettingsContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    mainNavRegistryService.registerMainNavItem({
      path: 'System/System Settings',
      label: 'navigation.systemSettings',
      className: 'item-style-modifier',
      order: 600,
      permission: UserPermission.SystemSettings,
      perspectivePermission: NavPermission.SystemSettings,
      widgetConfig: {
        name: 'system-settings',
        id: 'system-settings',
        component: 'system-settings',
        config: {
          translationKey: 'widget.system-settings',
          icon: {
            type: 'name',
            value: 'system-settings'
          }
        }
      }
    })
  }
})
