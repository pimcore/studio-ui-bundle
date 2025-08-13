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
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/classes/api-error'
import {
  type CustomReportsConfigCloneApiArg,
  type CustomReportsConfigDeleteApiArg,
  type CustomReportsConfigAddApiArg,
  useCustomReportsConfigAddMutation,
  useCustomReportsConfigCloneMutation,
  useCustomReportsConfigDeleteMutation
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'

interface IUseReportActionsReturn {
  addReport: (arg: CustomReportsConfigAddApiArg) => Promise<void>
  cloneReport: (arg: CustomReportsConfigCloneApiArg) => Promise<void>
  deleteReport: (arg: CustomReportsConfigDeleteApiArg) => Promise<void>
}

const useTrackMutationError = (isError: boolean, error: ApiErrorData | undefined): void => {
  useEffect(() => {
    if (isError) {
      trackError(new ApiError(error!))
    }
  }, [isError, error])
}

export const useReportActions = (): IUseReportActionsReturn => {
  const [addReportMutation, { isError: isAddReportError, error: addReportError }] = useCustomReportsConfigAddMutation()
  const [cloneReportMutation, { isError: isCloneReportError, error: cloneReportError }] = useCustomReportsConfigCloneMutation()
  const [deleteReportMutation, { isError: isDeleteReportError, error: deleteReportError }] = useCustomReportsConfigDeleteMutation()

  useTrackMutationError(isAddReportError, addReportError)
  useTrackMutationError(isCloneReportError, cloneReportError)
  useTrackMutationError(isDeleteReportError, deleteReportError)

  const addReport = async (arg: CustomReportsConfigAddApiArg): Promise<void> => {
    await addReportMutation(arg)
  }

  const cloneReport = async (arg: CustomReportsConfigCloneApiArg): Promise<void> => {
    await cloneReportMutation(arg)
  }

  const deleteReport = async (arg: CustomReportsConfigDeleteApiArg): Promise<void> => {
    await deleteReportMutation(arg)
  }

  return {
    addReport,
    cloneReport,
    deleteReport
  }
}
