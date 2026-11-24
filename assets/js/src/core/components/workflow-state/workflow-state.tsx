/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode } from 'react'
import cn from 'classnames'
import { useStyles } from './workflow-state.styles'
import { WorkflowStateDot } from './workflow-state-dot/workflow-state-dot'

export interface WorkflowStateProps {
  label: ReactNode
  color: string
  inverted?: boolean
  title?: string
  className?: string
}

export const WorkflowState = ({ label, color, inverted = false, title, className }: WorkflowStateProps): React.JSX.Element => {
  const { styles } = useStyles()
  const colorStyle: React.CSSProperties & Record<'--workflow-state-color', string> = { '--workflow-state-color': color }

  return (
    <span
      className={ cn('workflow-state', styles.workflowState, { [styles.inverted]: inverted }, className) }
      data-testid="workflow-state"
      style={ colorStyle }
      title={ title }
    >
      <WorkflowStateDot color={ color } />
      <span className={ styles.label }>{label}</span>
    </span>
  )
}
