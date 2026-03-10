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
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { QuantityValueContainer } from './quantity-value-container'
import { UserPermission } from '../auth/enums/user-permission'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions',
      label: 'navigation.data-model-definitions',
      order: 1200
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions/QuantityValues',
      label: 'navigation.quantity-values',
      className: 'item-style-modifier',
      order: 600,
      permission: UserPermission.QuantityValues,
      perspectivePermission: NavPermission.QuantityValues,
      widgetConfig: {
        name: 'quantity-values',
        id: 'quantity-values',
        component: 'quantity-values',
        config: {
          translationKey: 'widget.quantity-values',
          icon: {
            type: 'name',
            value: 'quantity-value'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'quantity-values',
      component: QuantityValueContainer
    })
  }
})
