/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import {
  type CustomReportsConfigGetTreeApiResponse,
  useCustomReportsConfigGetTreeQuery
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'

export interface IUseReportDataReturn {
  reportsConfigTreeData: CustomReportsConfigGetTreeApiResponse | undefined
  isReportsConfigTreeLoading: boolean
  isReportsConfigTreeFetching: boolean
  refetchReportsConfigTree: () => void
}

export const useReportEditorData = (): IUseReportDataReturn => {
  const {
    data: reportsConfigTreeData,
    isLoading: isReportsConfigTreeLoading,
    isFetching: isReportsConfigTreeFetching,
    refetch: refetchReportsConfigTree
  } = useCustomReportsConfigGetTreeQuery({ page: 1, pageSize: 9999 })

  return {
    reportsConfigTreeData,
    isReportsConfigTreeLoading,
    isReportsConfigTreeFetching,
    refetchReportsConfigTree
  }
}
