/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { useContext } from 'react'
import {
  type IWorkflowContext,
  WorkflowContext
} from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
import {
  useWorkflowGetDetailsQuery, type WorkflowGetDetailsApiResponse
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useElementContext } from '@Pimcore/modules/element/hooks/use-element-context'
import { useElementDraft } from '@Pimcore/modules/element/hooks/use-element-draft'

interface UseWorkflowHookReturn extends Omit<IWorkflowContext, 'fetchSubmitWorkflowAction'> {
  workflowDetailsData: WorkflowGetDetailsApiResponse | undefined
  isFetchingWorkflowDetails: boolean
}

export type TransitionType = 'transition' | 'global'

export const useWorkflow = (): UseWorkflowHookReturn => {
  const { openModal, closeModal, isModalOpen, contextWorkflowDetails, setContextWorkflowDetails } = useContext(WorkflowContext)
  const { id, elementType } = useElementContext()

  const { element } = useElementDraft(id, elementType)

  const hasWorkflowAvailable = element?.hasWorkflowAvailable ?? false
  const { data: workflowDetailsData, isFetching: isFetchingWorkflowDetails } = useWorkflowGetDetailsQuery({ elementType, elementId: id }, { skip: !hasWorkflowAvailable })

  return {
    openModal, closeModal, isModalOpen, contextWorkflowDetails, setContextWorkflowDetails, workflowDetailsData, isFetchingWorkflowDetails
  }
}
