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
import { store } from '@Pimcore/app/store'
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type ContextMenuRegistryInterface } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { MaintenanceModeIndicator } from './components/maintenance-mode-indicator/maintenance-mode-indicator'
import { useMaintenanceModeContext } from './context/maintenance-mode-context'
import { logoutUserMenuItemUpdate } from './logout-user-menu-item'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Maintenance-Mode',
      label: 'navigation.maintenance-mode',
      className: 'item-style-modifier',
      // Below System Settings (1100), above About (9999)
      order: 1200,
      hidden: () => !selectCurrentUser(store.getState()).isAdmin,
      perspectivePermission: NavPermission.MaintenanceMode,
      useCustomMainNavItem: () => {
        const { activateWithConfirmation } = useMaintenanceModeContext()

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

    const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(serviceIds['App/ContextMenuRegistry/ContextMenuRegistry'])

    contextMenuRegistry.updateSlotProvider(contextMenuConfig.userMenu.name, 'logout', logoutUserMenuItemUpdate)
  }
})
