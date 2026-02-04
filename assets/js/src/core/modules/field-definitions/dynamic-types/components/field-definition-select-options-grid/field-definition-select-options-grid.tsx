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
import { createColumnHelper } from '@tanstack/react-table'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { DragEndEvent } from '@dnd-kit/core'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'

interface SelectOption {
  key: string
  value: string
}

interface FieldDefinitionSelectOptionsGridProps {
  value?: SelectOption[]
  onChange?: (value: SelectOption[]) => void
}

export const FieldDefinitionSelectOptionsGrid = ({ value = [], onChange }: FieldDefinitionSelectOptionsGridProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { textarea } = useFormModal()
  const [selectedRows, setSelectedRows] = useState({})

  const columnHelper = createColumnHelper<SelectOption>()

  const columns = useMemo(() => [
    columnHelper.accessor('key', {
      header: t('display-name'),
      meta: { editable: true }
    }),
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
  ], [t, columnHelper, value, onChange])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id && (value !== null && value !== undefined)) {
      const oldIndex = value.findIndex((_: any, index: number) => `row-${value[index].key}-${index}` === active.id)
      const newIndex = value.findIndex((_: any, index: number) => `row-${value[index].key}-${index}` === over?.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newValue = [...value]
        const [reorderedItem] = newValue.splice(oldIndex, 1)
        newValue.splice(newIndex, 0, reorderedItem)
        onChange?.(newValue)
      }
    }
  }, [value, onChange])

  const openCsvModal = (): void => {
    const csvValue = value.map((option) => `${option.key},${option.value}`).join('\n')

    textarea({
      title: t('csv-separated-options'),
      label: t('csv-separated-options-info'),
      initialValue: csvValue,
      onOk: (newValue) => {
        if (typeof newValue === 'string') {
          const newOptions = newValue.split('\n').filter((line) => line.trim() !== '').map((line) => {
            const [key, ...valueParts] = line.split(',')
            return {
              key: key?.trim() ?? '',
              value: valueParts.join(',')?.trim() ?? ''
            }
          })
          onChange?.(newOptions)
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
      setRowId={ (row, index) => `row-${row.key}-${index}` } // Provide stable IDs for drag animation
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
                      key: '',
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
