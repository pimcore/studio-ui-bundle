/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined } from 'lodash'
import { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/types'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigGetTreeApiResponse
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { findReportById } from '@Pimcore/modules/reports/reports-editor/components/helpers'

export interface ReportsTreeRefetchResult {
  data?: CustomReportsConfigGetTreeApiResponse
  error?: ApiErrorData
}

interface OpenImportedReportArgs {
  reportName: string
  refetch: () => Promise<ReportsTreeRefetchResult>
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
}

/**
 * @throws ApiError when the tree refetch resolves with an error; RTK Query never rejects it.
 */
export const openImportedReport = async ({ reportName, refetch, handleOpenReport }: OpenImportedReportArgs): Promise<void> => {
  const { data: updatedData, error } = await refetch()

  if (!isNil(error)) {
    throw new ApiError(error)
  }

  const importedReport = findReportById(updatedData?.items, reportName)

  if (isUndefined(importedReport)) {
    return
  }

  handleOpenReport(importedReport)
}
