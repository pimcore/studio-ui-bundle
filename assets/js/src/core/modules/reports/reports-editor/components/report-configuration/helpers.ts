/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { castArray, isNull } from 'lodash'
import { type ReportFormData } from '@Pimcore/modules/reports/reports-editor/hooks/use-report-form-state'
import type { CustomReportsConfigUpdateApiArg } from '@Pimcore/modules/reports/custom-reports-api-slice.gen'

export const normalizeDataSourceConfig = (data: ReportFormData): {
  dataSourceConfig: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['dataSourceConfig']
} => {
  return {
    dataSourceConfig: castArray(
      data?.dataSourceConfig ?? []
    )
  }
}

interface INormalizeChartDataReturn {
  pieColumn: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['pieColumn']
  pieLabelColumn: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['pieLabelColumn']
  xAxis: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['xAxis']
  yAxis: CustomReportsConfigUpdateApiArg['bundleCustomReportUpdate']['yAxis']
}

export const normalizeChartData = (data: ReportFormData): INormalizeChartDataReturn => {
  if (data.chartType === '') {
    return { xAxis: '', yAxis: [], pieColumn: '', pieLabelColumn: '' }
  }

  return {
    pieColumn: data.pieColumn,
    pieLabelColumn: data.pieLabelColumn,
    xAxis: data.xAxis,
    yAxis: isNull(data.yAxis) ? [] : castArray(data.yAxis)
  }
}
