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
import { useTranslation } from 'react-i18next'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Button } from '@Pimcore/components/button/button'
import { type IWorkflowCardProps } from '../../types'
import { getWorkflowActions } from '../../../types/workflow-types'
import { useWorkflowAction } from '../../../hooks/use-workflow-action'

export const DropdownButton = ({ workflow }: IWorkflowCardProps): ReactNode => {
  const { t } = useTranslation()
  const { triggerAction, submissionLoading } = useWorkflowAction()

  // Built on every render, so a click always runs the current triggerAction: it closes over the
  // element's current state (e.g. the unsaved-changes guard), which a menu built once on mount would not.
  const items: DropdownMenuProps['items'] = getWorkflowActions(workflow).map((action) => ({
    key: action.actionType + '-' + action.transitionId,
    label: t(action.label),
    onClick: () => {
      triggerAction(action)
    }
  }))

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
