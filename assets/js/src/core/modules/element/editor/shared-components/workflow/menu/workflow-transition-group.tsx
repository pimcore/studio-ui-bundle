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
import { getWorkflowActions, type WorkflowAction } from '../types/workflow-types'
import { Button } from '@Pimcore/components/button/button'
import { useStyles } from '@Pimcore/modules/element/editor/shared-components/workflow/menu/workflow-transition-group.styles'
import cn from 'classnames'
import type {
  WorkflowDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice.gen'
import { useWorkflowAction } from '../hooks/use-workflow-action'

interface WorkflowItemProps {
  workflow: WorkflowDetails
}

export const WorkflowTransitionGroup = ({ workflow }: WorkflowItemProps): React.JSX.Element => {
  const { triggerAction, submissionLoading } = useWorkflowAction()
  const workflowActions = getWorkflowActions(workflow)
  const { styles } = useStyles()
  const { t } = useTranslation()

  const isFirst = true
  const renderButton = (action: WorkflowAction): React.JSX.Element => {
    return (
      <Button
        className={ isFirst ? `${styles.button}` : cn(`${styles.button}`, `${styles['not-first']}`) }
        onClick={ () => {
          triggerAction(action)
        } }
        type='text'
      >
        {t(action.label)}
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
        {workflowActions.map((action) => renderButton(action))}
      </div>
    )
  }
}
