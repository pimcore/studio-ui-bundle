/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { api } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { isUndefined } from 'lodash'
import { isEmptyValue } from '@Pimcore/utils/type-utils'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { ReportsViewWrapper } from '@Pimcore/modules/reports/reports-view/reports-view-wrapper'

export const loadReportsMenuItems = async (): Promise<void> => {
  if (isAllowed(UserPermission.Reports)) {
    const REPORTS_SECTION_NAME = 'Reporting'
    const DYNAMIC_REPORT_PREFIX = 'dynamic_report_'
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    try {
      const reportsData = await store.dispatch(api.endpoints.customReportsGetTree.initiate(undefined, { forceRefetch: true })).unwrap()

      if (!isUndefined(reportsData?.items)) {
        const validPaths = new Set<string>()

        reportsData.items.forEach((report) => {
          if (report.menuShortcut && report.hasDataSourceConfig) {
            const reportId = report.name
            const path = !isEmptyValue(report.group)
              ? `${REPORTS_SECTION_NAME}/${report.group}/${reportId}`
              : `${REPORTS_SECTION_NAME}/${reportId}`

            validPaths.add(path)

            if (!isEmptyValue(report.group)) {
              validPaths.add(`${REPORTS_SECTION_NAME}/${report.group}`)
            }
          }
        })

        const currentItems = mainNavRegistryService.getMainNavItems()
        const itemsToRemove = currentItems.filter(item =>
          item.path.startsWith(`${REPORTS_SECTION_NAME}/`) &&
          !validPaths.has(item.path) &&
          item.id?.startsWith(DYNAMIC_REPORT_PREFIX)
        )

        itemsToRemove.forEach(item => {
          mainNavRegistryService.unregisterMainNavItem(item.path)
        })

        reportsData.items.forEach((report, index) => {
          if (report.menuShortcut && report.hasDataSourceConfig) {
            const reportId = report.name
            const reportName = !isEmptyValue(report.niceName) ? report.niceName : reportId
            const path = !isEmptyValue(report.group)
              ? `${REPORTS_SECTION_NAME}/${report.group}/${reportId}`
              : `${REPORTS_SECTION_NAME}/${reportId}`

            const reportIconClass = report.iconClass
            const reportGroupIconClass = report.groupIconClass

            if (!isEmptyValue(report.group)) {
              mainNavRegistryService.registerMainNavItem({
                id: `${DYNAMIC_REPORT_PREFIX}group_${report.group}`,
                path: `${REPORTS_SECTION_NAME}/${report.group}`,
                label: report.group,
                order: 300 + index,
                permission: UserPermission.Reports,
                perspectivePermission: NavPermission.Reports,
                ...(!isEmptyValue(reportGroupIconClass) && { icon: reportGroupIconClass })
              })
            }

            mainNavRegistryService.registerMainNavItem({
              id: `${DYNAMIC_REPORT_PREFIX}${reportId}-${index}`,
              path,
              label: reportName,
              group: report.group,
              order: 300 + index,
              permission: UserPermission.Reports,
              perspectivePermission: NavPermission.Reports,
              ...(!isEmptyValue(reportIconClass) && { icon: reportIconClass }),
              ...(!isEmptyValue(reportGroupIconClass) && { groupIcon: reportGroupIconClass }),
              widgetConfig: {
                component: 'dynamic-report',
                config: {
                  translationKey: 'navigation.reports',
                  icon: {
                    type: 'name',
                    value: 'pie-chart'
                  },
                  reportId
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
    } catch (e) {
      console.error('Failed to load reports for menu:', e)
    }
  }
}
