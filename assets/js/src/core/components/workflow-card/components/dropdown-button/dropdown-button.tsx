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

import React, { type ReactNode, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Button } from '@Pimcore/components/button/button'
import { useSubmitWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-submit-workflow'
import { useWorkflow } from '@Pimcore/modules/asset/editor/toolbar/workflow-log-modal/hooks/use-workflow'
import { type IWorkflowCardProps } from '../../types'

export const DropdownButton = ({ workflow }: IWorkflowCardProps): ReactNode => {
  const [items, setItems] = useState<DropdownMenuProps['items']>([])
  const { t } = useTranslation()

  const { submitWorkflowAction, submissionLoading } = useSubmitWorkflow(workflow.workflowName)
  const { openModal } = useWorkflow()

  const setWorkflowData = (): void => {
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
  }

  useEffect(() => {
    setWorkflowData()
  }, [])

  return (
    <Dropdown
      menu={ { items } }
      placement="bottom"
    >
      {submissionLoading
        ? (
          <Button
            loading
            type={ 'link' }
          />
          )
        : <Button>{t('component.workflow-card.action-btn')}</Button>}
    </Dropdown>
  )
}
