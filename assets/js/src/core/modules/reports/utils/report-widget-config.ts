/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { isEmptyValue } from '@Pimcore/utils/type-utils'

export interface ReportWidgetSource {
  name: string
  niceName?: string | null
}

export const getReportDisplayName = (report: ReportWidgetSource): string =>
  isEmptyValue(report.niceName) ? report.name : report.niceName!

export const buildReportWidgetConfig = (report: ReportWidgetSource): WidgetManagerTabConfig => {
  const displayName = getReportDisplayName(report)

  return {
    name: displayName,
    id: `dynamic-report-${report.name}`,
    component: 'dynamic-report',
    config: {
      label: displayName,
      icon: {
        type: 'name',
        value: 'pie-chart'
      },
      reportId: report.name
    }
  }
}

/**
 * Report tabs persisted before reports got a stable id carry a generated one. They are migrated
 * in place (by their original id) to the id and title of the current widget config.
 */
export const isLegacyReportWidget = (
  persisted: WidgetManagerTabConfig,
  current: WidgetManagerTabConfig
): boolean =>
  persisted.component === 'dynamic-report' &&
  !isEmptyValue(persisted.id) &&
  !isEmptyValue(current.id) &&
  persisted.id !== current.id
