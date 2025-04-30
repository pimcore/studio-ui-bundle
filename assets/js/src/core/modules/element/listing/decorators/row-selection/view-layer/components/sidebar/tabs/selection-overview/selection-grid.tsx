/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { useRowSelection } from '../../../../../context-layer/provider/use-row-selection'
import { Grid } from '@Pimcore/components/grid/grid'
import { type GridProps } from '@Pimcore/types/components/types'
import { createColumnHelper } from '@tanstack/react-table'
import { Flex } from '@Pimcore/components/flex/flex'
import { IconButton } from '@Pimcore/components/icon-button/icon-button'

export const SelectionGrid = (): React.JSX.Element => {
  const { selectedRows, selectedRowsData, setSelectedRows } = useRowSelection()
  const currentSelectedRows = selectedRows!
  const columnHelper = createColumnHelper<any>()

  const onRemoveItemClick = (id: string): void => {
    const newSelectedRows = { ...selectedRows }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete newSelectedRows[id]
    setSelectedRows(newSelectedRows)
  }

  const columns: GridProps['columns'] = useMemo(() => ([
    columnHelper.accessor('id', {
      header: 'ID',
      size: 75
    }),

    columnHelper.accessor('fullpath', {
      header: 'Fullpath',
      meta: {
        autoWidth: true
      }
    }),

    columnHelper.accessor('actions', {
      header: '',
      size: 50,
      cell: (info) => (
        <Flex
          align='center'
          className='w-full'
          justify='center'
        >
          <IconButton
            icon={ { value: 'close' } }
            onClick={ () => { onRemoveItemClick(info.getValue() as string) } }
          />
        </Flex>
      )
    })
  ]), [selectedRowsData])

  const data: GridProps['data'] = useMemo(() => (Object.keys(currentSelectedRows ?? {}).map((id) => {
    const row = selectedRowsData[id]

    if (row === undefined) {
      return {}
    }

    return {
      id: row.id,
      fullpath: row.fullpath,
      actions: row.id
    }
  })), [currentSelectedRows, selectedRowsData])

  return useMemo(() => (
    <Grid
      autoWidth
      columns={ columns }
      data={ data }
    />
  ), [data])
}
