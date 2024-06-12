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
import { Badge, Button, Card, Dropdown, type MenuProps, Tag } from 'antd'
import { type WorkflowDetails } from '@Pimcore/modules/element/editor/workflow-api-slice.gen'
import { useStyles } from '@Pimcore/components/workflow-card/workflow-card.styles'
import { useTranslation } from 'react-i18next'

interface IWorkflowCardProps {
  workflow: WorkflowDetails
}

export const WorkflowCard = ({ workflow }: IWorkflowCardProps): React.JSX.Element => {
  const { styles } = useStyles()
  const { t } = useTranslation()
  const DropdownButton = (): ReactNode => {
    const [items, setItems] = React.useState<MenuProps['items']>([])

    useEffect(() => {
      const items: MenuProps['items'] = []

      const mergedActions = [
        ...workflow.allowedTransitions ?? [],
        ...workflow.globalActions ?? []
      ]
      mergedActions?.forEach((status) => {
        items.push({
          key: Number(items.length + 1).toString(),
          label: (
            <a href={ 'https://pimcore.com' }>
              {status.label}
            </a>
          )
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
                icon={
                  <Badge
                    color={ status.backgroundColor }
                    styles={ { indicator: { outline: `1px solid ${status.backgroundColor}33` } } }
                  />
                }
                key={ index }
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
