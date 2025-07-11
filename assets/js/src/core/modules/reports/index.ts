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
import { ReportsView } from '@Pimcore/modules/reports/reports-view/reports-view'
import { CustomReportsView } from '@Pimcore/modules/reports/custom-reports-view/custom-reports-view'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'Marketing/Reports',
      label: 'navigation.reports',
      className: 'item-style-modifier',
      // TODO: Update once this task is completed: https://github.com/pimcore/studio-backend-bundle/issues/1211
      perspectivePermission: NavPermission.CustomReports,
      widgetConfig: {
        name: 'Reports',
        id: 'reports',
        component: 'reports',
        config: {
          translationKey: 'navigation.reports',
          icon: {
            type: 'name',
            value: 'pie-chart'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'Marketing/Custom Reports',
      label: 'navigation.custom-reports',
      // TODO: Update once this task is completed: https://github.com/pimcore/studio-backend-bundle/issues/1211
      perspectivePermission: NavPermission.CustomReports,
      widgetConfig: {
        name: 'Custom Reports',
        id: 'custom-reports',
        component: 'custom-reports',
        config: {
          translationKey: 'navigation.custom-reports',
          icon: {
            type: 'name',
            value: 'pie-chart'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'reports',
      component: ReportsView
    })

    widgetRegistryService.registerWidget({
      name: 'custom-reports',
      component: CustomReportsView
    })
  }
})
