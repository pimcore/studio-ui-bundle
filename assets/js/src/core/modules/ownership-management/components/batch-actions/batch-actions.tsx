/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelectedRowsContext } from '../../context/selected-items-context'

export interface BatchActionsProps {
  onBatchAssign: (ids: string[]) => void
  onBatchDelete: (ids: string[]) => void
}

export const BatchActions = (props: BatchActionsProps): React.JSX.Element => {
  const { onBatchAssign, onBatchDelete } = props
  const { t } = useTranslation()
  const { selectedRows } = useSelectedRowsContext()
  const ids = Object.keys(selectedRows)

  const menu: DropdownMenuProps = {
    items: [
      {
        key: 'batch-assign',
        label: t('ownership-management.actions.batch-assign'),
        icon: <Icon value={ 'edit' } />,
        onClick: () => { onBatchAssign(ids) }
      },
      {
        key: 'batch-delete',
        label: t('ownership-management.actions.batch-delete'),
        icon: <Icon value={ 'trash' } />,
        onClick: () => { onBatchDelete(ids) }
      }
    ]
  }

  return (
    <Dropdown menu={ menu }>
      <DropdownButton key={ 'dropdown-button' }>{t('listing.actions')}</DropdownButton>
    </Dropdown>
  )
}
