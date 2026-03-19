/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box, IconButton, OperationalGrid, Space } from '@sdk/components'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { message } from 'antd'
import { isReservedWord } from '@Pimcore/modules/field-definitions/dynamic-types/utils/reserved-words'

interface AllowedColumn {
  position: number
  key: string
  label: string
  type: string
  value: string
  width: number
}

interface FieldDefinitionAllowedColumnsGridProps {
  value?: AllowedColumn[]
  onChange?: (value: AllowedColumn[]) => void
}

const columnHelper = createColumnHelper<AllowedColumn>()

const useColumns = (): Array<ColumnDef<AllowedColumn, any>> => {
  const { t } = useTranslation()

  return useMemo(() => [
    columnHelper.accessor('position', {
      header: t('position'),
      size: 70,
      meta: {
        editable: true,
        type: 'number'
      }
    }),
    columnHelper.accessor('key', {
      header: t('key'),
      size: 100,
      meta: { editable: true, type: 'input' }
    }),
    columnHelper.accessor('label', {
      header: t('label'),
      size: 120,
      meta: { editable: true, type: 'input' }
    }),
    columnHelper.accessor('type', {
      header: t('type'),
      size: 100,
      meta: {
        editable: true,
        type: 'select',
        config: {
          options: [
            { label: t('number'), value: 'number' },
            { label: t('text'), value: 'text' },
            { label: t('select'), value: 'select' },
            { label: t('bool'), value: 'bool' },
            { label: t('column-bool'), value: 'columnbool' },
            { label: t('multiselect'), value: 'multiselect' }
          ]
        }
      }
    }),
    columnHelper.accessor('value', {
      header: t('value'),
      size: 110,
      meta: { editable: true, type: 'input' }
    }),
    columnHelper.accessor('width', {
      header: t('width'),
      size: 70,
      meta: {
        editable: true,
        type: 'number'
      }
    })
  ], [t])
}

export const FieldDefinitionAllowedColumnsGrid = ({ value = [], onChange }: FieldDefinitionAllowedColumnsGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [selectedRows, setSelectedRows] = useState({})

  const columns = useColumns()

  const hasSelection = Object.values(selectedRows).some(Boolean)

  const validateKey = (keyValue: string): boolean => {
    const trimmedValue = keyValue.trim()

    if (trimmedValue.length <= 1) {
      return false
    }

    // eslint-disable-next-line prefer-regex-literals
    const validKeyPattern = new RegExp('^[a-zA-Z0-9_]+$')
    const match = validKeyPattern.exec(trimmedValue)

    if (match === null) {
      return false
    }

    return !isReservedWord(trimmedValue)
  }

  const handleUpdateCellData = async (event: { rowIndex: number, columnId: string, value: any }): Promise<void> => {
    if (event.columnId === 'key') {
      if (!validateKey(String(event.value))) {
        await message.error(`${t('relation-invalid-key-in-columns')}`)
        return
      }
    }

    const newValue = [...value]
    newValue[event.rowIndex] = { ...newValue[event.rowIndex], [event.columnId]: event.value }
    onChange?.(newValue)
  }

  return (
    <OperationalGrid
      columns={ columns }
      enableRowSelection
      enableSorting={ false }
      onChange={ onChange as (value: any[]) => void }
      onSelectedRowsChange={ setSelectedRows }
      onUpdateCellData={ handleUpdateCellData }
      selectedRows={ selectedRows }
      value={ value }
    >
      <Space
        direction="vertical"
        size="small"
        style={ { width: '100%' } }
      >
        <Box style={ { overflowX: 'auto' } }>
          <OperationalGrid.Grid />
        </Box>

        <OperationalGrid.Operations>
          {(operations) => {
            return (
              <Space>
                <IconButton
                  icon={ { value: 'new-something' } }
                  onClick={ () => {
                    operations.addRow({
                      position: (value.length > 0 ? Math.max(...value.map((v) => v.position ?? 0)) : 0) + 1,
                      key: 'name',
                      label: '',
                      type: 'text',
                      value: '',
                      width: null
                    })
                  } }
                  tooltip={ { title: t('add') } }
                  type="default"
                />

                <IconButton
                  disabled={ !hasSelection }
                  icon={ { value: 'trash' } }
                  onClick={ () => { operations.deleteSelectedRows() } }
                  tooltip={ { title: t('delete') } }
                  type="default"
                />
              </Space>
            )
          }}
        </OperationalGrid.Operations>
      </Space>
    </OperationalGrid>
  )
}
