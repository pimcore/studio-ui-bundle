/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

export interface IGridFilter {
  columnFilters?: Array<{ property: string, value: any, type: string, operator: string }>
  drillDownFilters?: Record<string, any>
  page: number
  setPage: (page: number) => void
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export enum FilterDrillDown {
  ONLY_FILTER = 'only_filter',
  FILTER_AND_SHOW = 'filter_and_show',
}

export type FilterDrillDownType = FilterDrillDown | undefined
