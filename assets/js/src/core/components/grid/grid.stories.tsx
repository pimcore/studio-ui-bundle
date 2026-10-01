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
import { type Meta } from '@storybook/react'
import { Grid } from './grid'
import { createColumnHelper } from '@tanstack/react-table'
import { DefaultCell } from './columns/default-cell'
import { type GridProps } from '@Pimcore/types/components/types'

const config: Meta = {
  title: 'Components/Data Display/Grid',
  component: Grid,

  tags: ['autodocs'],

  render: (data: GridProps) => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [_data, setData] = useState(data.data)

      function onUpdateCellData ({ rowIndex, columnId, value }): void {
        const updatedData = [..._data]
        updatedData[rowIndex][columnId] = value
        setData(updatedData)
      }

      return (
        <Grid
          { ...data }
          data={ _data }
          onUpdateCellData={ onUpdateCellData }
        />
      )
    }

    return <ComponentWrapper />
  }
}

export default config

interface User {
  firstname: string
  lastname: string
  age: number
}

const data: User[] = [
  { firstname: 'John', lastname: 'Doe', age: 25 },
  { firstname: 'Jane', lastname: 'Doe', age: 22 }
]

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('firstname', {}),
  columnHelper.accessor('lastname', {
    cell: info => <b><DefaultCell { ...info } /></b>
  }),
  columnHelper.accessor('age', {
    cell: info => <b><DefaultCell { ...info } /></b>
  })
]

export const _default = {

  args: {
    data,
    columns,
    isLoading: false
  }
}

export const ModifiedColumns = {
  args: {
    data,
    columns,
    modifiedCells: [
      { rowIndex: 0, columnId: 'firstname' },
      { rowIndex: 1, columnId: 'lastname' }
    ]
  }
}

const editableColumns = [
  columnHelper.accessor('firstname', {
    meta: {
      editable: true
    }
  }),
  columnHelper.accessor('lastname', {
    cell: info => <b><DefaultCell { ...info } /></b>,
    meta: {
      editable: (row) => row.lastname === 'Doe'
    }
  }),
  columnHelper.accessor('age', {
    header: 'Non editable age',
    cell: info => <b><DefaultCell { ...info } /></b>
  })
]

export const EditableColumns = {
  args: {
    data,
    columns: editableColumns,
    onUpdateCellData: ({ rowIndex, columnId, value }) => {
      console.log({ rowIndex, columnId, value })
    }
  }
}

export const SortableColumns = {
  args: {
    data,
    columns: editableColumns,
    enableSorting: true
  }
}

export const SmallSize = {
  args: {
    data,
    columns,
    size: 'small'
  }
}

export const EmptyState = {
  args: {
    data: [],
    columns,
    isLoading: false
  }
}

export const RowSelection = {
  render: (args: GridProps) => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [selectedRows, setSelectedRows] = useState<GridProps['selectedRows']>({ 0: true })

      return (
        <Grid
          { ...args }
          onSelectedRowsChange={ setSelectedRows }
          selectedRows={ selectedRows }
        />
      )
    }

    return <ComponentWrapper />
  },

  args: {
    data,
    columns,
    enableMultipleRowSelection: true
  }
}

export const RowClickMultiSelection = {
  parameters: {
    docs: {
      description: {
        story: 'Multi-select with the checkbox column still visible: a click anywhere on the row toggles it exactly like its checkbox (used by the element selector in multi-select mode). Keyboard: Tab focuses a row, Space (or Enter, since no `onRowDoubleClick` is set) toggles it.'
      }
    }
  },

  render: (args: GridProps) => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [selectedRows, setSelectedRows] = useState<GridProps['selectedRows']>({})

      return (
        <Grid
          { ...args }
          onRowClick={ (row) => {
            const newSelectedRows: NonNullable<GridProps['selectedRows']> = {}

            for (const rowId in selectedRows) {
              if (rowId !== row.id) {
                newSelectedRows[rowId] = selectedRows[rowId]
              }
            }

            if (selectedRows?.[row.id] !== true) {
              newSelectedRows[row.id] = true
            }

            setSelectedRows(newSelectedRows)
          } }
          onSelectedRowsChange={ setSelectedRows }
          selectedRows={ selectedRows }
        />
      )
    }

    return <ComponentWrapper />
  },

  args: {
    data,
    columns,
    enableMultipleRowSelection: true
  }
}

export const RowClickSelection = {
  parameters: {
    docs: {
      description: {
        story: 'Selection stays fully enabled while the checkbox column is suppressed via `rowSelectionColumn: \'none\'` — a click anywhere on the row toggles it instead, and `onRowDoubleClick` carries the confirm action (used by the element selector in single-select mode). Rows with click handlers are keyboard-accessible: Tab focuses a row, Space selects it, Enter triggers the double-click action.'
      }
    }
  },

  render: (args: GridProps) => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [selectedRows, setSelectedRows] = useState<GridProps['selectedRows']>({})

      return (
        <Grid
          { ...args }
          onRowClick={ (row) => {
            setSelectedRows(selectedRows?.[row.id] === true ? {} : { [row.id]: true })
          } }
          onRowDoubleClick={ (row) => { console.log('apply row', row.id) } }
          onSelectedRowsChange={ setSelectedRows }
          selectedRows={ selectedRows }
        />
      )
    }

    return <ComponentWrapper />
  },

  args: {
    data,
    columns,
    enableRowSelection: true,
    rowSelectionColumn: 'none'
  }
}
