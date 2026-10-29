/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isString } from 'lodash'
import { type AppDispatch } from '@sdk/app'
import { store } from '@Pimcore/app/store'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type WidgetRestorer } from '@Pimcore/modules/widget-manager/services/widget-restorer-registry'
import { updateWidget, type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { api } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { buildReportWidgetConfig } from '@Pimcore/modules/reports/utils/report-widget-config'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { isAllowedInPerspective } from '@Pimcore/modules/perspectives/permission-checker'
import { NavPermission } from '@Pimcore/modules/perspectives/enums/nav-permission'
import { isNonEmptyString } from '@Pimcore/utils/type-utils'

/**
 * Restores report tabs that were switched to another report in the report dropdown and have no main
 * navigation item to restore from, because the report has no menu shortcut.
 */
export class ReportWidgetRestorer implements WidgetRestorer {
  supports (config: WidgetManagerTabConfig): boolean {
    return config.component === 'dynamic-report' &&
      isNonEmptyString(config.config?.reportId) &&
      !isString(config.config?.mainNavPath) &&
      !this.hasMainNavItem(config)
  }

  async restore (config: WidgetManagerTabConfig, dispatch: AppDispatch): Promise<boolean> {
    if (!isAllowed(UserPermission.Reports) || !isAllowedInPerspective(NavPermission.Reports)) {
      return false
    }

    try {
      const tree = await store.dispatch(api.endpoints.customReportsGetTree.initiate(undefined)).unwrap()
      const report = tree.items?.find((item) => item.name === config.config.reportId && item.hasDataSourceConfig)

      if (isNil(report)) {
        return false
      }

      dispatch(updateWidget(buildReportWidgetConfig(report)))
      return true
    } catch {
      return false
    }
  }

  private hasMainNavItem (config: WidgetManagerTabConfig): boolean {
    const mainNavRegistry = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    return mainNavRegistry.getMainNavItems().some((item) =>
      item.widgetConfig?.id === config.id &&
      item.widgetConfig?.component === config.component
    )
  }
}
