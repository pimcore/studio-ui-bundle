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
import { Flex } from '@Pimcore/components/flex/flex'
import { WorkflowStateDot } from '@Pimcore/components/workflow-state/workflow-state-dot'
import { type TreeNodeContentMetaProps } from './tree-node-content'
import { useStyles } from './tree-node-content.styles'

export const TreeNodeWorkflowStates = ({ node }: TreeNodeContentMetaProps): React.JSX.Element | null => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { workflowStates } = node

  if (workflowStates === undefined || workflowStates.length === 0) {
    return null
  }

  return (
    <Flex
      align="center"
      className={ styles.workflowStates }
      data-testid={ `tree-node-workflow-states-${node.id}` }
      gap="mini"
    >
      {workflowStates.map((state, index) => (
        <WorkflowStateDot
          color={ state.color }
          key={ `${index}-${state.title}` }
          label={ t(state.label) }
        />
      ))}
    </Flex>
  )
}
