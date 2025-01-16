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
import { Badge, Card, Tag } from 'antd'
import { useStyles } from '@Pimcore/components/workflow-card/workflow-card.styles'
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
                className={ status.colorInverted ? 'color-inverted' : '' }
                icon={
                  <Badge
                    color={ status.color }
                    styles={ status.colorInverted
                      ? { indicator: { outline: `1px solid ${status.color}4D` } }
                      : {}
                                        }
                  />
                                }
                key={ `${index}-${status.title}` }
                style={ status.colorInverted
                  ? { backgroundColor: `${status.color}33` }
                  : {}
                                }
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
