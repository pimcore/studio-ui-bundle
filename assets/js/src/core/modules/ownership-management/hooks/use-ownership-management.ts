/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { invalidatingTags } from '@Pimcore/app/api/pimcore/tags'
import { useAppDispatch } from '@Pimcore/app/store'
import GeneralError from '@Pimcore/modules/app/error-handler/classes/general-error'
import trackError from '@Pimcore/modules/app/error-handler/error-handler'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { OwnershipReassignOwnerJob } from '@Pimcore/modules/execution-engine/jobs/ownership-management/ownership-reassign-owner-job'
import { OwnershipDeleteJob } from '@Pimcore/modules/execution-engine/jobs/ownership-management/ownership-delete-job'
import { api } from '../ownership-management-api-slice-enhanced'

interface UseOwnershipManagementHookReturn {
  reassignOwner: (type: string, ids: string[], newOwnerId: number, onFinish?: () => void) => Promise<void>
  deleteConfigurations: (type: string, ids: string[], onFinish?: () => void) => Promise<void>
  refresh: () => void
}

export const useOwnershipManagement = (): UseOwnershipManagementHookReturn => {
  const dispatch = useAppDispatch()
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)

  const reassignOwner = async (
    type: string,
    ids: string[],
    newOwnerId: number,
    onFinish?: () => void
  ): Promise<void> => {
    try {
      const job = new OwnershipReassignOwnerJob({
        configurationType: type,
        ids,
        newOwnerId,
        onFinish
      })

      await executionEngine.runJob(job)
    } catch (error) {
      trackError(new GeneralError('Failed to reassign the owner of the selected configuration(s)'))
      onFinish?.()
    }
  }

  const deleteConfigurations = async (
    type: string,
    ids: string[],
    onFinish?: () => void
  ): Promise<void> => {
    try {
      const job = new OwnershipDeleteJob({
        configurationType: type,
        ids,
        onFinish
      })

      await executionEngine.runJob(job)
    } catch (error) {
      trackError(new GeneralError('Failed to delete the selected configuration(s)'))
      onFinish?.()
    }
  }

  const refresh = (): void => {
    dispatch(api.util.invalidateTags(invalidatingTags.OWNERSHIP_MANAGEMENT()))
  }

  return {
    reassignOwner,
    deleteConfigurations,
    refresh
  }
}
