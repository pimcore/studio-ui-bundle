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
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
import { useLanguageLookup } from '@Pimcore/modules/translations/hooks/use-language-lookup'
import type { DragEndEvent } from '@dnd-kit/core'
import { isEqual, isNil } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'

interface ITableProps {
  data: any[]
  onChangeOrder?: (data) => void
  onChange?: (data) => void
  viewData?: any[]
  editData?: any[]
}

export const LanguageTable = ({
  data, viewData, editData,
  onChangeOrder, onChange
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const { getDisplayName } = useLanguageLookup()

  const columnsData = data.map((name: string) => (
    {
      name: getDisplayName(name),
      abbreviation: name,
      ...(viewData != null ? { view: viewData.includes(name) || false } : {}),
      ...(editData != null ? { edit: editData.includes(name) || false } : {})
    })
  )
  const [gridData, setGridData] = useState<any[]>(columnsData)

  const handleOrder = (currentIndex: number, newIndex: number): void => {
    if (currentIndex === -1 || newIndex < 0) {
      return
    }

    const updatedGridData = [...gridData]
    const [movedItem] = updatedGridData.splice(currentIndex, 1)
    updatedGridData.splice(newIndex, 0, movedItem)

    setGridData(updatedGridData)

    if (onChangeOrder !== null && onChangeOrder !== undefined) {
      onChangeOrder(updatedGridData.map((item) => item.abbreviation))
    }
  }

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event

    if (!isNil(active) && !isNil(over) && !isEqual(active.id, over.id)) {
      setGridData(prev => {
        const oldIndex = prev.findIndex(row => row.abbreviation === active.id)
        const newIndex = prev.findIndex(row => row.abbreviation === over.id)

        if (oldIndex === -1 || newIndex === -1) return prev

        const reorderedData = arrayMove(prev, oldIndex, newIndex)

        if (onChangeOrder !== null && onChangeOrder !== undefined) {
          onChangeOrder(reorderedData.map((item) => item.abbreviation))
        }

        return reorderedData
      })
    }
  }

  const columnHelper = createColumnHelper()
  const tableColumns = [
    ...onChangeOrder !== null && onChangeOrder !== undefined
      ? [columnHelper.accessor('order', {
          header: '',
          size: 40
        })]
      : [],
    columnHelper.accessor('name', {
      header: t('user-management.settings.language.name'),
      meta: {
        type: 'text-cell',
        editable: false
      },
      size: 184
    }),
    columnHelper.accessor('abbreviation', {
      header: t('user-management.settings.language.abbreviation'),
      meta: {
        type: 'text-cell',
        editable: false
      },
      size: 270
    })
  ]

  if (onChangeOrder !== null && onChangeOrder !== undefined) {
    tableColumns.push(columnHelper.accessor('actions', {
      header: '',
      size: 60,
      cell: (context) => {
        return (
          <div>
            <IconButton
              disabled={ context.row.index === 0 }
              icon={ { value: 'chevron-up' } }
              onClick={ () => { handleOrder(context.row.index, context.row.index - 1) } }
            />
            <IconButton
              disabled={ context.row.index === tableColumns.length - 1 }
              icon={ { value: 'chevron-down' } }
              onClick={ () => { handleOrder(context.row.index, context.row.index + 1) } }
            />
          </div>
        )
      }
    }))
  }

  if (onChange !== null && onChange !== undefined) {
    tableColumns.push(columnHelper.accessor('view', {
      header: t('user-management.settings.language.view'),
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      },
      size: 50
    }))

    tableColumns.push(columnHelper.accessor('edit', {
      header: t('user-management.settings.language.edit'),
      meta: {
        type: 'checkbox',
        editable: true,
        config: {
          align: 'center'
        }
      },
      size: 50
    }))
  }

  const onUpdateCellData = ({ rowIndex, columnId, value, rowData }): void => {
    console.log('onUpdateCellData', { rowIndex, columnId, value, rowData })
    const updatedGridData = gridData.map((item, index) => {
      if (index === rowIndex) {
        if (columnId === 'edit') {
          return { ...item, [columnId]: value, view: value }
        } else {
          return { ...item, [columnId]: value }
        }
      }
      return item
    })

    setGridData(updatedGridData)

    if (onChange !== null && onChange !== undefined) {
      onChange(updatedGridData)
    }
  }

  return (
    <div className={ styles.table }>
      {(
        <>
          {(
            <Grid
              autoWidth
              columns={ tableColumns }
              data={ gridData }
              enableRowDrag={ onChangeOrder !== null && onChangeOrder !== undefined }
              handleDragEnd={ handleDragEnd }
              onUpdateCellData={ onUpdateCellData }
              setRowId={ (row) => row.abbreviation }
            />
              )}
        </>
        )}
    </div>
  )
}
