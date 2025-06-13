/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from './services/main-nav-registry'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'

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
      path: 'Tools/Email',
      label: 'navigation.email',
      //permission: UserPermission.Emails,
      //perspectivePermissionHide: NavPermission.ToolsHidden
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Tools/Email/Email-Blocklist',
      label: 'navigation.email-blocklist',
      className: 'item-style-modifier',
      //permission: UserPermission.Emails,
      //perspectivePermissionHide: NavPermission.Mails, //TODO: double check https://github.com/pimcore/admin-ui-classic-bundle/blob/2.x/public/js/pimcore/layout/toolbar.js#L349
      widgetConfig: {
        name: 'EmailBlocklist',
        id: 'email-blocklist',
        component: 'email-blocklist',
        config: {
          translationKey: 'widget.email-blocklist',
          icon: {
            type: 'name',
            value: 'mail-02'
          }
        }
      }
    })
  }
})
