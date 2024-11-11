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
import { useStyles } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-transition-group.styles'
import cn from 'classnames'
import type {
  WorkflowDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'

interface WorkflowItemProps {
  workflow: WorkflowDetails
}

export const WorkflowTransitionGroup = ({ workflow }: WorkflowItemProps): React.JSX.Element => {
  const { openModal } = useWorkflow()
  const { submitWorkflowAction, submissionLoading } = useSubmitWorkflow(workflow.workflowName)
  const { styles } = useStyles()
  const { t } = useTranslation()

  const onClick = (actionType: string, transition: TransitionType, workflowName: string): void => {
    if (transition === 'global') openModal({ action: actionType, transition, workflowName })
    else if (transition === 'transition') {
      submitWorkflowAction(actionType, transition, workflowName, {})
    }
  }

  const isFirst = true
  const renderButton = (actionType: string, transition: TransitionType): React.JSX.Element => {
    return (
      <Button
        className={ isFirst ? `${styles.button}` : cn(`${styles.button}`, `${styles['not-first']}`) }
        onClick={ () => {
          onClick(actionType, transition, workflow.workflowName)
        } }
        type='text'
      >
        {t(`${actionType}`)}
      </Button>
    )
  }

  if (submissionLoading) {
    return (
      <Button
        loading={ submissionLoading }
        type={ 'link' }
      />
    )
  } else {
    return (
      <div>
        {workflow.allowedTransitions?.map((status) => renderButton(status.label, 'transition'))}
        {workflow.globalActions?.map((status) => renderButton(status.label, 'global'))}
      </div>
    )
  }
}
