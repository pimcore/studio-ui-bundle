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

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess',
      label: 'navigation.quick-access',
      icon: 'quick-access',
      order: 100
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement',
      label: 'navigation.data-management',
      icon: 'data-object',
      order: 200
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce',
      label: 'navigation.experience-ecommerce',
      icon: 'experience-commerce',
      order: 300
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
      order: 600
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Reporting',
      label: 'navigation.reporting',
      icon: 'reporting',
      order: 700
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System',
      label: 'navigation.system',
      icon: 'shield',
      order: 800
    })
  }
})
