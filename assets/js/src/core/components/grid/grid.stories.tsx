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
      editable: true
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
