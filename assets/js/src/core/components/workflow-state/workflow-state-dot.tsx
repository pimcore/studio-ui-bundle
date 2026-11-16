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
import cn from 'classnames'
import { Tooltip } from '@Pimcore/components/tooltip/tooltip'
import { useStyles } from './workflow-state-dot.styles'

export interface WorkflowStateDotProps {
  color: string
  label?: string
  className?: string
}

export const WorkflowStateDot = ({ label, color, className }: WorkflowStateDotProps): React.JSX.Element => {
  const { styles } = useStyles()
  const colorStyle: React.CSSProperties & Record<'--workflow-state-color', string> = { '--workflow-state-color': color }
  const dotClassName = cn('workflow-state-dot', styles.workflowStateDot, className)

  // without a label the dot is decorative, e.g. next to the visible label in a tag
  if (label === undefined) {
    return (
      <span
        aria-hidden
        className={ dotClassName }
        data-testid="workflow-state-dot"
        style={ colorStyle }
      />
    )
  }

  return (
    <Tooltip title={ label }>
      <span
        aria-label={ label }
        className={ dotClassName }
        data-testid="workflow-state-dot"
        role="img"
        style={ colorStyle }
      />
    </Tooltip>
  )
}
