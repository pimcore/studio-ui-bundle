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
import { createColumnHelper } from '@tanstack/react-table'
import { type GridProps } from '@Pimcore/types/components/types'
import { GridContentRenderer } from './grid-content-renderer'
import { Grid } from '../grid/grid'
import { DefaultCell } from '../grid/columns/default-cell'

const config: Meta = {
  title: 'Components/Data Display/Grid Content Renderer',
  component: GridContentRenderer,

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
        <GridContentRenderer>
          <Grid
            { ...data }
            data={ _data }
            onUpdateCellData={ onUpdateCellData }
          />
        </GridContentRenderer>
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
  { firstname: 'John', lastname: 'Doe', age: 25 }
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
