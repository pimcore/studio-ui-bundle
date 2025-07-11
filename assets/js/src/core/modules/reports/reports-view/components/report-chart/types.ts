/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { IReportDetailData } from '@Pimcore/modules/reports/reports-view/hooks/useReportData'

export interface IChartDataItem {
  type: string
  value: number
}

export type ChartProps = object[]
export type ReportDataProps = IReportDetailData
