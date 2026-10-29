/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import {
  type BundleCustomReportsConfigurationTreeNode,
  type CustomReportsConfigGetTreeApiResponse
} from '@Pimcore/modules/reports/custom-reports-api-slice.gen'
import { findReportById } from '@Pimcore/modules/reports/reports-editor/components/helpers'

interface OpenImportedReportArgs {
  reportName: string
  refetch: () => Promise<{ data?: CustomReportsConfigGetTreeApiResponse }>
  handleOpenReport: (report: BundleCustomReportsConfigurationTreeNode) => void
}

export const openImportedReport = async ({ reportName, refetch, handleOpenReport }: OpenImportedReportArgs): Promise<void> => {
  const { data: updatedData } = await refetch()

  const importedReport = findReportById(updatedData?.items, reportName)

  if (isUndefined(importedReport)) {
    return
  }

  handleOpenReport(importedReport)
}
