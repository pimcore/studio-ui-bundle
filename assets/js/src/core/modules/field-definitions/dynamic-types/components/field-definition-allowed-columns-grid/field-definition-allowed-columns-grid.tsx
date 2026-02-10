/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { Box, ButtonGroup, IconButton, OperationalGrid, Space } from '@sdk/components'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

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

const useColumns = (value: AllowedColumn[], onChange?: (value: AllowedColumn[]) => void): Array<ColumnDef<AllowedColumn, any>> => {
  const { t } = useTranslation()

  return useMemo(() => [
    columnHelper.accessor('position', {
      header: t('position'),
      meta: {
        editable: true,
        type: 'number'
      }
    }),
    columnHelper.accessor('key', {
      header: t('key'),
      meta: { editable: true }
    }),
    columnHelper.accessor('label', {
      header: t('label'),
      meta: { editable: true }
    }),
    columnHelper.accessor('type', {
      header: t('type'),
      meta: {
        editable: true,
        type: 'select',
        config: {
          options: [
            { label: t('number'), value: 'number' },
            { label: t('text'), value: 'text' },
            { label: t('select'), value: 'select' },
            { label: t('bool'), value: 'bool' },
            { label: t('column-bool'), value: 'column bool' },
            { label: t('multiselect'), value: 'multiselect' }
          ]
        }
      }
    }),
    columnHelper.accessor('value', {
      header: t('value'),
      meta: { editable: true }
    }),
    columnHelper.accessor('width', {
      header: t('width'),
      meta: {
        editable: true,
        type: 'number'
      }
    }),
    columnHelper.display({
      header: t('delete'),
      cell: (info) => (
        <Box padding="mini">
          <ButtonGroup
            items={ [
              <IconButton
                icon={ { value: 'trash' } }
                key="delete"
                onClick={ () => {
                  const newValue = [...value]
                  newValue.splice(info.row.index, 1)
                  onChange?.(newValue)
                } }
                size="small"
                tooltip={ { title: t('delete') } }
                type="link"
              />
            ] }
            noSpacing
          />
        </Box>
      ),
      id: 'actions',
      size: 70
    })
  ], [t, value, onChange])
}

export const FieldDefinitionAllowedColumnsGrid = ({ value = [], onChange }: FieldDefinitionAllowedColumnsGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [selectedRows, setSelectedRows] = useState({})

  const columns = useColumns(value, onChange)

  return (
    <OperationalGrid
      columns={ columns }
      enableRowSelection
      enableSorting={ false }
      onChange={ onChange as (value: any[]) => void }
      onSelectedRowsChange={ setSelectedRows }
      selectedRows={ selectedRows }
      value={ value }
    >
      <Space
        direction="vertical"
        size="small"
        style={ { width: '100%' } }
      >
        <OperationalGrid.Grid />

        <OperationalGrid.Operations>
          {(operations) => {
            return (
              <Space>
                <IconButton
                  icon={ { value: 'new-something' } }
                  onClick={ () => {
                    operations.addRow({
                      position: (value.length > 0 ? Math.max(...value.map((v) => v.position ?? 0)) : 0) + 1,
                      key: '',
                      label: '',
                      type: '',
                      value: '',
                      width: 0
                    })
                  } }
                  tooltip={ { title: t('add') } }
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
