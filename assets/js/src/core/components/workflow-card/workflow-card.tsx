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
  type WorkflowDetails
} from '@Pimcore/modules/element/editor/shared-tab-manager/tabs/workflow/workflow-api-slice-enhanced'
import { useStyles } from '@Pimcore/components/workflow-card/workflow-card.styles'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '../dropdown/dropdown'
import { useSubmitWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'

interface IWorkflowCardProps {
  workflow: WorkflowDetails
}

export const WorkflowCard = ({ workflow }: IWorkflowCardProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const { openModal } = useWorkflow()
  const { submitWorkflowAction, submissionLoading } = useSubmitWorkflow(workflow.workflowName)
  const DropdownButton = (): ReactNode => {
    const [items, setItems] = React.useState<DropdownMenuProps['items']>([])

    useEffect(() => {
      const items: DropdownMenuProps['items'] = []

      workflow.allowedTransitions?.forEach((status) => {
        items.push({
          key: Number(items.length + 1).toString(),
          label: t(`${status.label}`),
          onClick: () => {
            submitWorkflowAction(status.name, 'transition', workflow.workflowName, {})
          }
        })
      })

      workflow.globalActions?.forEach((status) => {
        items.push({
          key: Number(items.length + 1).toString(),
          label: t(`${status.label}`),
          onClick: () => {
            openModal({ transition: 'global', action: status.name, workflowName: workflow.workflowName })
          }
        })
      })

      setItems(items)
    }, [])

    return (
      <Dropdown
        disabled={ submissionLoading }
        menu={ { items } }
        placement="bottom"
      >
        <Button
          loading={ submissionLoading }
        >
          {t('component.workflow-card.action-btn')}</Button>
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
