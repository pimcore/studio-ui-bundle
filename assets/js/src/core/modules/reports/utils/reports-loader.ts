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
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    try {
      const reportsData = await store.dispatch(api.endpoints.customReportsGetTree.initiate({ page: 1, pageSize: 999999 })).unwrap()

      if (!isUndefined(reportsData?.items)) {
        reportsData.items.forEach((report, index) => {
          if (report.menuShortcut) {
            const reportId = report.name
            const reportName = !isEmptyValue(report.niceName) ? report.niceName : reportId
            const path = !isEmptyValue(report.group)
              ? `${REPORTS_SECTION_NAME}/${report.group}/${reportId}`
              : `${REPORTS_SECTION_NAME}/${reportId}`

            const reportIconClass = report.iconClass
            const reportGroupIconClass = report.groupIconClass

            mainNavRegistryService.registerMainNavItem({
              id: `${reportId}-${index}`,
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
