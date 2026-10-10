/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type BundleCustomReportsDetails } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { type IReportDataContext } from '@Pimcore/modules/reports/reports-view/context/report-data-context'

export interface IGridFilter {
  columnFilters?: Array<{ property: string, value: any, type: string, operator: string }>
  drillDownFilters?: Record<string, any>
}

export enum FilterDrillDown {
  ONLY_FILTER = 'only_filter',
  FILTER_AND_SHOW = 'filter_and_show',
}

export type FilterDrillDownType = FilterDrillDown | undefined

export interface ICustomReportViewProps {
  reportName: string
  reportDetailData: BundleCustomReportsDetails
  /** Generic report data; chartDetailData can still belong to the previous report while isFetching is true */
  reportData: IReportDataContext
}
