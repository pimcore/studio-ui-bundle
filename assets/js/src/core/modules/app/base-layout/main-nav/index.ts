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
import { type MainNavRegistry } from './services/main-nav-registry'
import { type WidgetRestorerRegistry } from '@Pimcore/modules/widget-manager/services/widget-restorer-registry'
import { MainNavWidgetRestorer } from './services/main-nav-widget-restorer'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRestorerRegistry = container.get<WidgetRestorerRegistry>(serviceIds.widgetRestorerRegistry)
    widgetRestorerRegistry.register(new MainNavWidgetRestorer())

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess',
      label: 'navigation.quick-access',
      icon: 'quick-access',
      order: 100,
      perspectivePermissionHide: NavPermission.QuickAccessHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement',
      label: 'navigation.data-management',
      icon: 'data-object',
      order: 200,
      perspectivePermissionHide: NavPermission.DataManagementHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce',
      label: 'navigation.experience-ecommerce',
      icon: 'experience-commerce',
      order: 300,
      perspectivePermissionHide: NavPermission.ExperienceEcommerceHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'AssetManagement',
      label: 'navigation.asset-management',
      icon: 'asset',
      order: 400
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'AutomationIntegration',
      label: 'navigation.automation-integration',
      icon: 'automation-integration',
      order: 500
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Translations',
      label: 'navigation.translations',
      icon: 'translate',
      order: 600,
      perspectivePermissionHide: NavPermission.TranslationsHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Reporting',
      label: 'navigation.reporting',
      icon: 'reporting',
      order: 700,
      perspectivePermissionHide: NavPermission.ReportingHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System',
      label: 'navigation.system',
      icon: 'shield',
      order: 800,
      perspectivePermissionHide: NavPermission.SystemHidden
    })
  }
})
