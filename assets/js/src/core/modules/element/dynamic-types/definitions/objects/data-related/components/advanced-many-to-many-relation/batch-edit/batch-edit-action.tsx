/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DropdownButton } from '@Pimcore/components/dropdown-button/dropdown-button'
import { Dropdown, type DropdownMenuProps } from '@Pimcore/components/dropdown/dropdown'
import { Icon } from '@Pimcore/components/icon/icon'
import { Checkbox } from '@Pimcore/components/checkbox/checkbox'
import { Divider } from 'antd'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'
import { type RelationColumnDefinition } from '../advanced-many-to-many-relation'
import { BatchEditModal } from './batch-edit-modal'
import { type BatchEditApplyEntry } from './use-batch-edit-actions'
import { type RowSelectionState } from '@tanstack/react-table'

export interface BatchEditActionProps {
  columns: RelationColumnDefinition[]
  selectedRows: RowSelectionState
  setSelectedRows: (rows: RowSelectionState) => void
  totalRowCount: number
  onApply: (entries: BatchEditApplyEntry[]) => void
  onDelete: () => void
  disabled?: boolean
}

export const BatchEditAction = ({ columns, selectedRows, setSelectedRows, totalRowCount, onApply, onDelete, disabled }: BatchEditActionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { confirm } = useFormModal()
  const [modalOpen, setModalOpen] = useState(false)

  const selectedRowCount = Object.keys(selectedRows).length
  const hasSelectedItems = selectedRowCount > 0

  if (totalRowCount === 0) {
    return <></>
  }

  const handleDeleteWithConfirmation = (): void => {
    const message = hasSelectedItems
      ? t('element.delete.batch.question', { count: selectedRowCount })
      : t('relations.remove-all.confirm')

    confirm({
      title: t('listing.actions.delete'),
      content: message,
      onOk: onDelete
    })
  }

  const menu: DropdownMenuProps = {
    items: [
      ...(columns.length > 0
        ? [
            {
              key: 'batch-edit',
              label: t('listing.actions.batch-edit'),
              icon: <Icon value="batch-selection" />,
              disabled,
              onClick: () => {
                setModalOpen(true)
              }
            }
          ]
        : []),
      {
        key: 'delete',
        label: t('listing.actions.delete'),
        icon: <Icon value="trash" />,
        disabled,
        onClick: handleDeleteWithConfirmation
      }
    ]
  }

  return (
    <>
      <Divider
        style={ { margin: 0, height: '1.6em' } }
        type="vertical"
      />

      {hasSelectedItems && (
        <Checkbox
          checked
          onClick={ (e) => {
            e.stopPropagation()
            setSelectedRows({})
          } }
        >
          {t('listing.selection.total', { total: selectedRowCount })}
        </Checkbox>
      )}

      <Dropdown menu={ menu }>
        <DropdownButton style={ { paddingLeft: 0, paddingRight: 0 } }>
          {hasSelectedItems ? t('listing.actions') : t('listing.non-selected.actions')}
        </DropdownButton>
      </Dropdown>

      {columns.length > 0 && (
        <BatchEditModal
          columns={ columns }
          onApply={ onApply }
          open={ modalOpen }
          setOpen={ setModalOpen }
        />
      )}
    </>
  )
}
