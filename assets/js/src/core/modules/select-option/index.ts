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
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { SelectOptionWidget } from '@Pimcore/modules/select-option/select-option-widget'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions',
      label: 'navigation.data-model-definitions',
      order: 1200
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions/SelectOptions',
      label: 'navigation.select-options',
      className: 'selectoption',
      order: 500,
      permission: UserPermission.SelectOptions,
      widgetConfig: {
        name: 'select-options',
        id: 'select-options',
        component: 'select-options',
        config: {
          translationKey: 'widget.select-options',
          icon: { type: 'name', value: 'select-type' }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'select-options',
      component: SelectOptionWidget
    })
  }
})
