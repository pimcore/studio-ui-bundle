/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type {
  WorkflowDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

export interface IWorkflowCardProps {
  workflow: WorkflowDetails
}
