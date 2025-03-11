/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from './services/main-nav-registry'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'File',
      icon: 'document',
      perspectivePermissionHide: NavPermission.FileHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Settings',
      icon: 'menu',
      perspectivePermissionHide: NavPermission.SettingsHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Tools',
      icon: 'accessory',
      perspectivePermissionHide: NavPermission.ToolsHidden
    })
  }
})
