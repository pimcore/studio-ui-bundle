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
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { type MainNavRegistry } from './services/main-nav-registry'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'File',
      label: 'navigation.file',
      icon: 'document',
      perspectivePermissionHide: NavPermission.FileHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Settings',
      label: 'navigation.settings',
      icon: 'menu',
      perspectivePermissionHide: NavPermission.SettingsHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Tools',
      label: 'navigation.tools',
      icon: 'accessory',
      perspectivePermissionHide: NavPermission.ToolsHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Marketing',
      label: 'navigation.marketing',
      icon: 'marketing',
      perspectivePermissionHide: NavPermission.SettingsHidden
    })
  }
})
