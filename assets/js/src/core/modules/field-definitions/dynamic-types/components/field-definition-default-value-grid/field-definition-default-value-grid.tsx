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
import { isString } from 'lodash'
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { DragEndEvent } from '@dnd-kit/core'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'

interface DefaultValueItem {
  value: string
}

interface FieldDefinitionDefaultValueGridProps {
  value?: DefaultValueItem[]
  onChange?: (value: DefaultValueItem[]) => void
}

const columnHelper = createColumnHelper<DefaultValueItem>()

const useColumns = (value: DefaultValueItem[], onChange?: (value: DefaultValueItem[]) => void): Array<ColumnDef<DefaultValueItem, any>> => {
  const { t } = useTranslation()

  return useMemo(() => [
    columnHelper.accessor('value', {
      header: t('value'),
      meta: { editable: true }
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

export const FieldDefinitionDefaultValueGrid = ({ value = [], onChange }: FieldDefinitionDefaultValueGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { textarea } = useFormModal()
  const [selectedRows, setSelectedRows] = useState({})

  const columns = useColumns(value, onChange)

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id && (value !== null && value !== undefined)) {
      const oldIndex = value.findIndex((_, index: number) => `row-${value[index].value}-${index}` === active.id)
      const newIndex = value.findIndex((_, index: number) => `row-${value[index].value}-${index}` === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newValue = [...value]
        const [reorderedItem] = newValue.splice(oldIndex, 1)
        newValue.splice(newIndex, 0, reorderedItem)
        onChange?.(newValue)
      }
    }
  }, [value, onChange])

  const openCsvModal = (): void => {
    const csvValue = value.map((item) => item.value).join('\n')

    textarea({
      title: t('csv-separated-values'),
      label: t('csv-separated-values-info'),
      initialValue: csvValue,
      onOk: (newValue) => {
        if (isString(newValue)) {
          const newItems = newValue.split('\n').filter((line) => line.trim() !== '').map((line) => {
            return {
              value: line.trim()
            }
          })
          onChange?.(newItems)
        }
      }
    })
  }

  return (
    <OperationalGrid
      columns={ columns }
      enableRowDrag
      enableRowSelection
      enableSorting={ false } // Disable sorting to avoid conflicts with drag
      handleDragEnd={ handleDragEnd }
      onChange={ onChange as (value: any[]) => void }
      onSelectedRowsChange={ setSelectedRows }
      selectedRows={ selectedRows }
      setRowId={ (row, index) => `row-${row.value}-${index}` } // Provide stable IDs for drag animation
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
                      value: ''
                    })
                  } }
                  tooltip={ { title: t('add') } }
                  type="default"
                />
                <IconButton
                  icon={ { value: 'edit' } }
                  onClick={ openCsvModal }
                  tooltip={ { title: t('csv-separated-options') } }
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
