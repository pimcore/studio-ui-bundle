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
import { OperationalGrid, type OperationalGridProps } from './operational-grid'
import { createColumnHelper, type RowSelectionState } from '@tanstack/react-table'
import { DefaultCell } from '../grid/columns/default-cell'
import { Button, Space } from 'antd'

const config: Meta = {
  title: 'Components/Data Entry/OperationalGrid',
  component: OperationalGrid,

  tags: ['autodocs'],

  render: (args: OperationalGridProps) => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [data, setData] = useState(args.value)
      const [selectedRows, setSelectedRows] = useState(args.selectedRows ?? {})

      const handleChange = (newValue: any[]) => {
        setData(newValue)
        args.onChange?.(newValue)
      }

      const handleSelectedRowsChange = (newSelectedRows: any) => {
        setSelectedRows(newSelectedRows)
        args.onSelectedRowsChange?.(newSelectedRows)
      }

      return (
        <OperationalGrid
          {...args}
          value={data}
          onChange={handleChange}
          selectedRows={selectedRows}
          onSelectedRowsChange={handleSelectedRowsChange}
        >
          <div style={{ marginBottom: 16 }}>
            <OperationalGrid.Operations>
              {(operations) => {
                const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                const hasSelection = selectedCount > 0
                const isMultipleSelection = args.enableMultipleRowSelection === true
                
                return (
                  <Space>
                    <Button 
                      type="primary" 
                      onClick={() => operations.addRow({ name: 'New Item', value: '', category: 'New' })}
                    >
                      Add Row
                    </Button>
                    {args.enableRowSelection && (
                      <>
                        <Button 
                          onClick={() => operations.deleteSelectedRows()}
                          disabled={!hasSelection}
                          danger
                        >
                          Delete Selected {isMultipleSelection ? `(${selectedCount})` : ''}
                        </Button>
                        <Button 
                          onClick={() => operations.clearSelectedRows()}
                          disabled={!hasSelection}
                        >
                          Clear Selection
                        </Button>
                      </>
                    )}
                  </Space>
                )
              }}
            </OperationalGrid.Operations>
          </div>
          
          <OperationalGrid.Grid />
        </OperationalGrid>
      )
    }

    return <ComponentWrapper />
  }
}

export default config

interface Item {
  name: string
  value: string
  category: string
}

const initialData: Item[] = [
  { name: 'Item 1', value: 'Value 1', category: 'Category A' },
  { name: 'Item 2', value: 'Value 2', category: 'Category B' },
  { name: 'Item 3', value: 'Value 3', category: 'Category A' }
]

const columnHelper = createColumnHelper<Item>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    meta: {
      editable: true
    }
  }),
  columnHelper.accessor('value', {
    header: 'Value',
    cell: info => <DefaultCell {...info} />,
    meta: {
      editable: true
    }
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => <DefaultCell {...info} />,
    meta: {
      editable: true
    }
  })
]

export const Default = {
  args: {
    value: initialData,
    columns,
    enableSorting: true,
    enableRowSelection: true,
    enableMultipleRowSelection: true,
    onChange: (value: Item[]) => {
      console.log('Data changed:', value)
    }
  }
}

export const WithModifiedCells = {
  args: {
    value: initialData,
    columns,
    enableSorting: true,
    enableRowSelection: true,
    modifiedCells: [
      { rowIndex: 0, columnId: 'name' },
      { rowIndex: 1, columnId: 'value' }
    ],
    onChange: (value: Item[]) => {
      console.log('Data changed:', value)
    }
  }
}

export const ReadOnly = {
  args: {
    value: initialData,
    columns: columns.map(col => ({
      ...col,
      meta: {
        ...col.meta,
        editable: false
      }
    })),
    enableSorting: true,
    enableRowSelection: true
  }
}

export const WithRowSelection = {
  args: {
    value: initialData,
    columns,
    enableSorting: true,
    enableRowSelection: true,
    enableMultipleRowSelection: true,
    onSelectedRowsChange: (selectedRows) => {
      console.log('Selected rows:', selectedRows)
    },
    onChange: (value: Item[]) => {
      console.log('Data changed:', value)
    }
  }
}

export const WithSingleRowSelection = {
  args: {
    value: initialData,
    columns,
    enableSorting: true,
    enableRowSelection: true,
    enableMultipleRowSelection: false,
    onSelectedRowsChange: (selectedRows) => {
      console.log('Selected rows:', selectedRows)
    },
    onChange: (value: Item[]) => {
      console.log('Data changed:', value)
    }
  }
}

export const Loading = {
  args: {
    value: initialData,
    columns,
    enableSorting: true,
    enableRowSelection: true,
    isLoading: true
  }
}
