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
import { type RelationColumnDefinition } from '../advanced-many-to-many-relation'
import { BatchEditModal } from './batch-edit-modal'
import { type RowSelectionState } from '@tanstack/react-table'

export interface BatchEditActionProps {
  columns: RelationColumnDefinition[]
  selectedRows: RowSelectionState
  setSelectedRows: (rows: RowSelectionState) => void
  totalRowCount: number
  onApply: (columnKey: string, value: any) => void
  onDelete: () => void
  disabled?: boolean
}

export const BatchEditAction = ({ columns, selectedRows, setSelectedRows, totalRowCount, onApply, onDelete, disabled }: BatchEditActionProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [modalOpen, setModalOpen] = useState(false)

  const editableColumns = columns.filter(col => col.type !== undefined)
  const selectedRowCount = Object.keys(selectedRows).length
  const hasSelectedItems = selectedRowCount > 0

  if (totalRowCount === 0) {
    return <></>
  }

  const menu: DropdownMenuProps = {
    items: [
      ...(editableColumns.length > 0
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
        onClick: onDelete
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

      {editableColumns.length > 0 && (
        <BatchEditModal
          columns={ editableColumns }
          onApply={ onApply }
          open={ modalOpen }
          setOpen={ setModalOpen }
        />
      )}
    </>
  )
}
