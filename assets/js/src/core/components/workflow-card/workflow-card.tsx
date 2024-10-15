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

import React, { type ReactNode, useEffect } from 'react'
import { Badge, Button, Card, Tag } from 'antd'
import {
  useWorkflowActionSubmitMutation,
  type WorkflowActionSubmitApiArg,
  type WorkflowDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useStyles } from '@Pimcore/components/workflow-card/workflow-card.styles'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '../dropdown/dropdown'
import { useAsset } from '@Pimcore/modules/asset/hooks/use-asset'

interface IWorkflowCardProps {
  workflow: WorkflowDetails
}

type ActionType = 'transition' | 'global'

export const WorkflowCard = ({ workflow }: IWorkflowCardProps): React.JSX.Element => {
  const { id } = useAsset()

  const toSnakeCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '')
  }

  const [fetchSubmitWorkflowAction] = useWorkflowActionSubmitMutation()

  const workFlowTransition = (transition: string, actionType: ActionType, workFlowOptions: any[] = []): WorkflowActionSubmitApiArg => ({
    submitAction: {
      actionType,
      elementId: id,
      elementType: 'asset',
      workflowName: toSnakeCase(workflow.workflowName),
      transition,
      workflowOptions: workFlowOptions
    }
  })

  const { styles } = useStyles()
  const { t } = useTranslation()
  const DropdownButton = (): ReactNode => {
    const [items, setItems] = React.useState<DropdownMenuProps['items']>([])
    const [comment, setComment] = React.useState<string>('')

    const submitWorkflowAction = (transition: string, actionType: ActionType, workFlowOptions: any[] = []): void => {
      fetchSubmitWorkflowAction(workFlowTransition(transition, actionType, workFlowOptions)).then(() => {
        console.log('----> submit workflow action')
      }).catch((error) => { console.error(`Failed to submit workflow action ${error}`) })
    }

    useEffect(() => {
      const items: DropdownMenuProps['items'] = []

      workflow.allowedTransitions?.forEach((status) => {
        items.push({
          key: Number(items.length + 1).toString(),
          label: status.label,
          onClick: () => { submitWorkflowAction(status.name, 'transition') }
        })
      })

      workflow.globalActions?.forEach((status) => {
        const workFlowOptions = [
          {
            notes: comment
          }
        ]
        items.push({
          key: Number(items.length + 1).toString(),
          label: status.label,
          onClick: () => { submitWorkflowAction(status.name, 'global', workFlowOptions) }
        })
      })

      setItems(items)
    }, [])

    return (
      <Dropdown
        menu={ { items } }
        placement="bottom"
      >
        <Button>{t('component.workflow-card.action-btn')}</Button>
      </Dropdown>
    )
  }

  return (
    <Card
      className={ styles.workflowCard }
      extra={ <DropdownButton /> }
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
                key={ index }
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
