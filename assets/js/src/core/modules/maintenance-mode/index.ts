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
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { MaintenanceModeIndicator } from './components/maintenance-mode-indicator'
import { useActivateMaintenanceMode } from './hooks/use-activate-maintenance-mode'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Maintenance-Mode',
      label: 'navigation.maintenance-mode',
      className: 'item-style-modifier',
      // Below System Settings (1100), above About (9999)
      order: 1200,
      permission: UserPermission.MaintenanceMode,
      perspectivePermission: NavPermission.MaintenanceMode,
      useCustomMainNavItem: () => {
        const { activateWithConfirmation } = useActivateMaintenanceMode()

        return {
          name: 'SystemMaintenanceMode',
          onClick: activateWithConfirmation
        }
      }
    })

    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.registerToSlot(componentConfig.leftSidebar.slot.name, {
      name: 'maintenanceModeIndicator',
      priority: 300,
      component: MaintenanceModeIndicator
    })
  }
})
