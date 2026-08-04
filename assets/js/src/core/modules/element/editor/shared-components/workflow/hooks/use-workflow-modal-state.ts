/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useContext } from 'react'
import {
  type IWorkflowContext,
  WorkflowContext
} from '@Pimcore/modules/element/editor/shared-components/workflow/provider/workflow-provider'

/**
 * The workflow modal state (open flag + the triggered action), with no element-editor dependency —
 * unlike {@link useWorkflow}, which also fetches the editor element's workflow details. The shared
 * modal and the action trigger use this so they work in any host, not only the element editor.
 */
export const useWorkflowModalState = (): IWorkflowContext => useContext(WorkflowContext)
