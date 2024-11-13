/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { useState } from 'react'
import { Grid } from '@Pimcore/components/grid/grid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useStyles } from './table.styles'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'
interface ITableProps {
  data: any[]
  onChangeOrder?: (data) => void
  onChange?: (data) => void
}

export const LanguageTable = ({
  data,
  onChangeOrder, onChange
}: ITableProps): React.JSX.Element => {
  const { t } = useTranslation()
  const { styles } = useStyles()
  const columnsData = data.map((name) => ({ name: t(`user-management.settings.language.name-${name}`), abbreviation: name, view: false, edit: false }))
  const [gridData, setGridData] = useState<any[]>(columnsData)

  const hanldeOrder = (currentIndex: number, newIndex: number): void => {
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

  const columnHelper = createColumnHelper()
  const tableColumns = [
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
              icon={ 'chevron-up' }
              onClick={ () => { hanldeOrder(context.row.index, context.row.index - 1) } }
            />
            <IconButton
              disabled={ context.row.index === tableColumns.length - 1 }
              icon={ 'chevron-down' }
              onClick={ () => { hanldeOrder(context.row.index, context.row.index + 1) } }
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
              onUpdateCellData={ onUpdateCellData }
              setRowId={ (row) => row.cid }
            />
          )}
        </>
      )}
    </div>
  )
}
