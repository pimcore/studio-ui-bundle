/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useEffect } from 'react'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import {
  type CustomReportsConfigCloneApiArg,
  type CustomReportsConfigDeleteApiArg,
  useCustomReportsConfigCloneMutation,
  useCustomReportsConfigDeleteMutation
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'

interface IUseReportActionsReturn {
  cloneReport: (arg: CustomReportsConfigCloneApiArg) => Promise<void>
  deleteReport: (arg: CustomReportsConfigDeleteApiArg) => Promise<void>
}

export const useReportActions = (): IUseReportActionsReturn => {
  const [deleteReportMutation, { isError: isDeleteReportError, error: deleteReportError }] = useCustomReportsConfigDeleteMutation()
  const [cloneReportMutation, { isError: isCloneReportError, error: cloneReportError }] = useCustomReportsConfigCloneMutation()

  const cloneReport = async (arg: CustomReportsConfigCloneApiArg): Promise<void> => {
    await cloneReportMutation(arg)
  }

  useEffect(() => {
    if (isCloneReportError) {
      trackError(new ApiError(cloneReportError))
    }
  }, [isCloneReportError])

  const deleteReport = async (arg: CustomReportsConfigDeleteApiArg): Promise<void> => {
    await deleteReportMutation(arg)
  }

  useEffect(() => {
    if (isDeleteReportError) {
      trackError(new ApiError(deleteReportError))
    }
  }, [isDeleteReportError])

  return {
    cloneReport,
    deleteReport
  }
}
