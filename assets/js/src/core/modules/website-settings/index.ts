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
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '../auth/enums/user-permission'
import { WebsiteSettingsContainer } from './website-settings-container'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce/Website Settings',
      label: 'navigation.website-settings',
      order: 10,
      className: 'item-style-modifier',
      permission: UserPermission.WebsiteSettings,
      perspectivePermission: NavPermission.WebsiteSettings,
      widgetConfig: {
        name: 'Website Settings',
        id: 'website-settings',
        component: 'website-settings',
        config: {
          translationKey: 'widget.website-settings',
          icon: {
            type: 'name',
            value: 'web-settings'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'website-settings',
      component: WebsiteSettingsContainer
    })
  }
})
