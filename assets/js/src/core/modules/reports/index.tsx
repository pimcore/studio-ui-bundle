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
import { ReportsViewWrapper } from '@Pimcore/modules/reports/reports-view/reports-view-wrapper'
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
      path: 'Reporting/Reports',
      label: 'navigation.reports',
      className: 'item-style-modifier',
      order: 100,
      perspectivePermission: NavPermission.Reports,
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
      path: 'Reporting/Custom Reports',
      label: 'navigation.custom-reports',
      order: 200,
      perspectivePermission: NavPermission.Reports,
      widgetConfig: {
        name: 'Custom Reports',
        id: 'custom-reports',
        component: 'custom-reports',
        config: {
          translationKey: 'navigation.custom-reports',
          icon: {
            type: 'name',
            value: 'chart-scatter'
          }
        }
      }
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'reports',
      component: ReportsViewWrapper
    })

    widgetRegistryService.registerWidget({
      name: 'custom-reports',
      component: CustomReportsView
    })
  }
})
