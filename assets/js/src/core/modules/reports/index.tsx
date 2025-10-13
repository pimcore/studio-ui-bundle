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
import { ReportsEditor } from '@Pimcore/modules/reports/reports-editor/reports-editor'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import {
  type DynamicTypeCustomReportDefinitionRegistry
} from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/dynamic-type-custom-report-definition-registry'
import {
  type DynamicTypeCustomReportDefinitionSqlAdapter
} from '@Pimcore/modules/reports/dynamic-types/definitions/custom-report-definition-adapters/types/dynamic-type-custom-report-definition-sql-adapter'
import type { WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'

const REPORTS_SECTION_NAME = 'Reporting'

export const REPORTS_WIDGET: WidgetManagerTabConfig = {
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

export const CUSTOM_REPORTS_WIDGET: WidgetManagerTabConfig = {
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

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)
    const sourceDefinitionRegistry = container.get<DynamicTypeCustomReportDefinitionRegistry>(serviceIds['DynamicTypes/CustomReportDefinitionRegistry'])

    sourceDefinitionRegistry.registerDynamicType(container.get<DynamicTypeCustomReportDefinitionSqlAdapter>(serviceIds['DynamicTypes/CustomReportDefinition/Sql']))

    mainNavRegistryService.registerMainNavItem({
      path: `${REPORTS_SECTION_NAME}/Reports`,
      label: 'navigation.reports',
      className: 'item-style-modifier',
      order: 100,
      dividerBottom: true,
      permission: UserPermission.Reports,
      perspectivePermission: NavPermission.Reports,
      widgetConfig: REPORTS_WIDGET
    })

    mainNavRegistryService.registerMainNavItem({
      path: `${REPORTS_SECTION_NAME}/Custom Reports`,
      label: 'navigation.custom-reports',
      order: 200,
      dividerBottom: true,
      permission: UserPermission.ReportsConfig,
      perspectivePermission: NavPermission.Reports,
      widgetConfig: CUSTOM_REPORTS_WIDGET
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'reports',
      component: ReportsViewWrapper
    })

    widgetRegistryService.registerWidget({
      name: 'custom-reports',
      component: ReportsEditor
    })
  }
})
