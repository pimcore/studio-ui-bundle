/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { TagAssignJob } from '@Pimcore/modules/execution-engine/jobs/tag-assign/tag-assign-job'

interface UseShortcutActionsReturn {
  removeAndApplyTagsToChildren: () => Promise<void>
  applyTagsToChildren: () => Promise<void>
}

export const useShortcutActions = (): UseShortcutActionsReturn => {
  const { id, elementType } = useElementContext()
  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)

  const applyTagsToChildren = async (): Promise<void> => {
    const job = new TagAssignJob({
      elementType,
      elementId: id,
      operation: 'assign'
    })

    await executionEngine.runJob(job)
  }

  const removeAndApplyTagsToChildren = async (): Promise<void> => {
    const job = new TagAssignJob({
      elementType,
      elementId: id,
      operation: 'replace'
    })

    await executionEngine.runJob(job)
  }

  return {
    removeAndApplyTagsToChildren,
    applyTagsToChildren
  }
}
