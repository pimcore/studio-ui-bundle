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
import { ManagementContainer } from '@Pimcore/modules/user/management/management-container'
import { RoleContainer } from '@Pimcore/modules/user/roles/container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '../auth/enums/user-permission'
import { UserProfileWidget } from '@Pimcore/modules/auth/profile/widget'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/User & Roles',
      label: 'navigation.user-and-roles',
      order: 100,
      dividerBottom: true,
      permission: UserPermission.Users,
      perspectivePermissionHide: NavPermission.UsersHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/User & Roles/Users',
      label: 'navigation.users',
      order: 100,
      className: 'item-style-modifier',
      permission: UserPermission.Users,
      perspectivePermission: NavPermission.Users,
      widgetConfig: {
        name: 'Users',
        id: 'user-management',
        component: 'user-management',
        config: {
          translationKey: 'widget.user-management',
          icon: {
            type: 'name',
            value: 'user'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'System/User & Roles/Roles',
      label: 'navigation.roles',
      order: 200,
      permission: UserPermission.Users,
      perspectivePermission: NavPermission.Roles,
      widgetConfig: {
        name: 'Roles',
        id: 'role-management',
        component: 'role-management',
        config: {
          translationKey: 'widget.role-management',
          icon: {
            type: 'name',
            value: 'user'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'user-management',
      component: ManagementContainer
    })

    widgetRegistryService.registerWidget({
      name: 'role-management',
      component: RoleContainer
    })

    widgetRegistryService.registerWidget(UserProfileWidget)
  }
})
