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
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { RecycleBinContainer } from './recycle-bin-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '../auth/enums/user-permission'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'recycle-bin',
      component: RecycleBinContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'QuickAccess/Recycle Bin',
      label: 'navigation.recycle-bin',
      permission: UserPermission.RecycleBin,
      order: 400,
      perspectivePermission: NavPermission.RecycleBin,
      widgetConfig: {
        name: 'recycleBin',
        id: 'recycle-bin',
        component: 'recycle-bin',
        config: {
          translationKey: 'widget.recycle-bin',
          icon: {
            type: 'name',
            value: 'trash'
          }
        }
      }
    })
  }
})
