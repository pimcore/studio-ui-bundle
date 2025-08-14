/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import { store } from '@Pimcore/app/store'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { ReportsViewWrapper } from '@Pimcore/modules/reports/reports-view/reports-view-wrapper'
import { CustomReportsView } from '@Pimcore/modules/reports/custom-reports-view/custom-reports-view'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { api } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

moduleSystem.registerModule({
  onInit: async () => {
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

    try {
      const reportsData = await store.dispatch(
        api.endpoints.customReportsGetTree.initiate({ page: 1, pageSize: 999999 })
      ).unwrap()

      if (!isUndefined(reportsData?.items)) {
        reportsData.items.forEach((report, index) => {
          if (report.menuShortcut) {
            const reportName = !isEmptyValue(report.niceName) ? report.niceName : report.name
            const path = !isEmptyValue(report.group)
              ? `Reporting/${report.group}/${reportName}`
              : `Reporting/${reportName}`

            mainNavRegistryService.registerMainNavItem({
              path,
              order: 300 + index,
              perspectivePermission: NavPermission.Reports,
              widgetConfig: {
                component: 'dynamic-report',
                config: {
                  translationKey: 'navigation.reports',
                  icon: {
                    type: 'name',
                    value: 'pie-chart'
                  },
                  reportId: report.name
                }
              }
            })
          }
        })

        widgetRegistryService.registerWidget({
          name: 'dynamic-report',
          component: ReportsViewWrapper
        })
      }
    } catch (error) {
      console.error('Failed to load reports for menu:', error)
    }
  }
})
