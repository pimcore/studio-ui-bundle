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

import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  type TransitionType,
  useWorkflow
} from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'
import { Button } from '@Pimcore/components/button/button'
import { useSubmitWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow'

interface WorkflowItemProps {
  workflowName: string
  transition: TransitionType
  actionType: string
}

export const WorkflowItem = ({ workflowName, transition, actionType }: WorkflowItemProps): React.JSX.Element => {
  const { openModal } = useWorkflow()
  const { submitWorkflowAction, submissionLoading } = useSubmitWorkflow(workflowName)
  // const { styles } = useStyles();
  const { t } = useTranslation()

  const onClick = (actionType: string, transition: TransitionType, workflowName: string): void => {

    if (transition === 'global') openModal({ action: actionType, transition, workflowName })
    else if (transition === 'transition') {
      submitWorkflowAction(actionType, transition, workflowName, {})
    }
  }

  return (
    <Button
      loading={ submissionLoading }
      onClick={ () => {
        onClick(actionType, transition, workflowName)
      } }
    >
      {t(`${actionType}`)}
    </Button>
  )
}
