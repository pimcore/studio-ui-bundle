/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type ReactNode, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Button } from '@Pimcore/components/button/button'
import { type IWorkflowCardProps } from '../../types'
import { getWorkflowActions } from '../../../types/workflow-types'
import { useWorkflowAction } from '../../../hooks/use-workflow-action'

export const DropdownButton = ({ workflow }: IWorkflowCardProps): ReactNode => {
  const [items, setItems] = useState<DropdownMenuProps['items']>([])
  const { t } = useTranslation()
  const workflowActions = getWorkflowActions(workflow)

  const { triggerAction, submissionLoading } = useWorkflowAction()

  const setWorkflowData = (): void => {
    const items: DropdownMenuProps['items'] = []

    workflowActions.forEach((action) => {
      items.push({
        key: action.actionType + '-' + action.transitionId,
        label: t(action.label),
        onClick: () => {
          triggerAction(action)
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
