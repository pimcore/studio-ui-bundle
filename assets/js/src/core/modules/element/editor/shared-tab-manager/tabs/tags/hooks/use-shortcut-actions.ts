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
  type TagBatchOperationToElementsByTypeAndIdApiArg,
  useTagBatchOperationToElementsByTypeAndIdMutation
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/tags/tags-api-slice.gen'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useJobs } from '@Pimcore/modules/execution-engine/hooks/useJobs'
import { createJob } from '@Pimcore/modules/execution-engine/jobs/tag-assign/factory'
import { defaultTopics, topics } from '@Pimcore/modules/execution-engine/topics'
import trackError, { ApiError } from '@Pimcore/modules/app/error-handler'

interface UseShortcutActionsReturn {
  removeAndApplyTagsToChildren: () => Promise<void>
  applyTagsToChildren: () => Promise<void>
}

export const useShortcutActions = (): UseShortcutActionsReturn => {
  const { id, elementType } = useElementContext()
  const [tagBatchMutation] = useTagBatchOperationToElementsByTypeAndIdMutation()
  const { addJob } = useJobs()

  const assignTags = async (operation: TagBatchOperationToElementsByTypeAndIdApiArg['operation']): Promise<number> => {
    const assignTask = tagBatchMutation({
      elementType,
      id,
      operation
    })

    assignTask.catch(() => {
      console.log('Failed to apply tags to children')
    })

    const response = await assignTask

    if (response.error !== undefined) {
      trackError(new ApiError(response.error))
    }

    const data = response.data!
    return data.jobRunId
  }

  const applyTagsToChildren = async (): Promise<void> => {
    addJob(createJob({
      title: 'Assign tags to children',
      topics: [topics['tag-assignment-finished'], ...defaultTopics],
      action: async () => await assignTags('assign')
    }))
  }

  const removeAndApplyTagsToChildren = async (): Promise<void> => {
    addJob(createJob({
      title: 'Replace and assign tags to children',
      topics: [topics['tag-replacement-finished'], ...defaultTopics],
      action: async () => await assignTags('replace')
    }))
  }

  return {
    removeAndApplyTagsToChildren,
    applyTagsToChildren
  }
}
