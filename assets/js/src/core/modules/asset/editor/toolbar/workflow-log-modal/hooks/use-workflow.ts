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

// import { useContext } from 'react'
// import { WorkflowContext } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/workflow-provider'
//
// interface UseWorkflowHookReturn {
//   showWorkflowLogModal: boolean
//   setShowWorkflowLogModal: (showWorkflowLogModal: boolean) => void
// }
//
// export const useWorkflow = (): UseWorkflowHookReturn => {
//   const { showWorkflowLogModal, setShowWorkflowLogModal } = useContext(WorkflowContext)
//
//   const openShowWorkflowLogModal = () => {
//     setShowWorkflowLogModal(true)
//   }
//
//   return {
//     showWorkflowLogModal,
//     openShowWorkflowLogModal
//   }
// }

export const useWorkflow: () => IWorkflowContext = () => {
  return useContext(WorkflowContext)
}
