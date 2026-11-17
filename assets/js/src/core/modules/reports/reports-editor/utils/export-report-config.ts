/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil } from 'lodash'
import { type AppDispatch } from '@Pimcore/app/store'
import { downloadFile } from '@Pimcore/modules/app/utils/download'
import trackError, { ApiError, GeneralError } from '@Pimcore/modules/app/error-handler'
import { api } from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'
import { getReportExportFileName } from '@Pimcore/modules/reports/reports-editor/utils/config-transfer-urls'

export const exportReportConfig = async (dispatch: AppDispatch, reportName: string): Promise<void> => {
  try {
    const result = await dispatch(
      api.endpoints.customReportsConfigExport.initiate({ name: reportName }, { forceRefetch: true, subscribe: false })
    )

    if (!isNil(result.error)) {
      trackError(new ApiError(result.error))
      return
    }

    if (!(result.data instanceof Blob)) {
      trackError(new GeneralError('Failed to export custom report'))
      return
    }

    downloadFile(getReportExportFileName(reportName), result.data)
  } catch {
    trackError(new GeneralError('Failed to export custom report'))
  }
}
