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
import { Badge } from '@Pimcore/components/badge/badge'
import { Tag } from '@Pimcore/components/tag/tag'
import { Card } from '@Pimcore/components/card/card'
import { useStyles } from './workflow-card.styles'
import { DropdownButton } from './components/dropdown-button/dropdown-button'
import { type IWorkflowCardProps } from './types'

export const WorkflowCard = ({ workflow }: IWorkflowCardProps): React.JSX.Element => {
  const { styles } = useStyles()

  return (
    <Card
      className={ styles.workflowCard }
      extra={ <DropdownButton workflow={ workflow } /> }
      title={ (
        <>
          <p>{workflow.workflowName}</p>

          {workflow.workflowStatus !== undefined && workflow.workflowStatus?.length > 0 && (
            workflow.workflowStatus.map((status, index) => (
              <Tag
                colorInverted={ status.colorInverted ? status.color : undefined }
                icon={ !status.colorInverted ? <Badge color={ status.color } /> : undefined }
                key={ `${index}-${status.title}` }
                title={ status.title }
              >
                {status.label}
              </Tag>
            ))
          )}
        </>
            ) }
    >
      {workflow.graph !== undefined && (
        <img
          alt={ 'workflow' }
          src={ `data:image/svg+xml;utf8,${encodeURIComponent(workflow.graph)}` }
        />
      )}
    </Card>
  )
}
