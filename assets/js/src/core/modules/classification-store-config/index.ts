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
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { ClassificationStoreConfig } from '@Pimcore/modules/classification-store-config/classification-store-config'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions/ClassificationStore',
      label: 'navigation.classification-store',
      className: 'classification-store',
      order: 400,
      permission: UserPermission.ClassificationStore,
      perspectivePermission: NavPermission.ClassificationStore,
      widgetConfig: {
        name: 'classification-store',
        id: 'classification-store-config',
        component: 'classification-store-config',
        config: {
          translationKey: 'widget.classification-store-config',
          icon: { type: 'name', value: 'classification-store' }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'classification-store-config',
      component: ClassificationStoreConfig
    })
  }
})
