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
import { isUndefined } from 'lodash'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'
import { type ApiErrorData } from '@Pimcore/modules/app/error-handler/classes/api-error'
import {
  type CustomReportsConfigCloneApiArg,
  type CustomReportsConfigDeleteApiArg,
  type CustomReportsConfigAddApiArg,
  type CustomReportsConfigUpdateApiArg,
  useCustomReportsConfigAddMutation,
  useCustomReportsConfigCloneMutation,
  useCustomReportsConfigDeleteMutation,
  useCustomReportsConfigUpdateMutation
} from '@Pimcore/modules/reports/custom-reports-api-slice-enhanced'

interface IUseReportActionsReturn {
  addReport: (arg: CustomReportsConfigAddApiArg) => Promise<void>
  cloneReport: (arg: CustomReportsConfigCloneApiArg) => Promise<void>
  deleteReport: (arg: CustomReportsConfigDeleteApiArg) => Promise<void>
  updateReport: (arg: CustomReportsConfigUpdateApiArg) => Promise<void>
}

const useTrackMutationError = (isError: boolean, error: ApiErrorData | undefined): void => {
  useEffect(() => {
    if (isError && !isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [isError, error])
}

export const useReportActions = (): IUseReportActionsReturn => {
  const [addReportMutation, { isError: isAddReportError, error: addReportError }] = useCustomReportsConfigAddMutation()
  const [cloneReportMutation, { isError: isCloneReportError, error: cloneReportError }] = useCustomReportsConfigCloneMutation()
  const [deleteReportMutation, { isError: isDeleteReportError, error: deleteReportError }] = useCustomReportsConfigDeleteMutation()
  const [updateReportMutation, { isError: isUpdateReportError, error: updateReportError }] = useCustomReportsConfigUpdateMutation()

  useTrackMutationError(isAddReportError, addReportError)
  useTrackMutationError(isCloneReportError, cloneReportError)
  useTrackMutationError(isDeleteReportError, deleteReportError)
  useTrackMutationError(isUpdateReportError, updateReportError)

  const addReport = async (arg: CustomReportsConfigAddApiArg): Promise<void> => {
    await addReportMutation(arg)
  }

  const cloneReport = async (arg: CustomReportsConfigCloneApiArg): Promise<void> => {
    await cloneReportMutation(arg)
  }

  const deleteReport = async (arg: CustomReportsConfigDeleteApiArg): Promise<void> => {
    await deleteReportMutation(arg)
  }

  const updateReport = async (arg: CustomReportsConfigUpdateApiArg): Promise<void> => {
    await updateReportMutation(arg)
  }

  return {
    addReport,
    cloneReport,
    deleteReport,
    updateReport
  }
}
