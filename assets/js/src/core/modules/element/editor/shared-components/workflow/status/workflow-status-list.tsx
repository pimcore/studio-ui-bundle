/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { useTranslation } from 'react-i18next'
import { WorkflowState } from '@Pimcore/components/workflow-state/workflow-state'
import type {
  WorkflowStatus
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

export interface WorkflowStatusListProps {
  statuses: WorkflowStatus[]
}

export const WorkflowStatusList = ({ statuses }: WorkflowStatusListProps): React.JSX.Element => {
  const { t } = useTranslation()

  return (
    <>
      {statuses.map((status, index) => (
        <WorkflowState
          color={ status.color }
          inverted={ status.colorInverted }
          key={ `${index}-${status.title}` }
          label={ t(status.label) }
        />
      ))}
    </>
  )
}
