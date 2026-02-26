/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { ObjectBrickWidget } from '@Pimcore/modules/object-brick/object-brick-widget'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions',
      label: 'navigation.data-model-definitions',
      order: 1200
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions/ObjectBricks',
      label: 'navigation.object-bricks',
      className: 'objectbrick',
      order: 300,
      permission: UserPermission.ObjectBricks,
      perspectivePermission: NavPermission.ObjectBricks,
      widgetConfig: {
        name: 'object-bricks',
        id: 'object-bricks',
        component: 'object-bricks',
        config: {
          translationKey: 'widget.object-bricks',
          icon: { type: 'name', value: 'object-bricks' }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'object-bricks',
      component: ObjectBrickWidget
    })
  }
})
