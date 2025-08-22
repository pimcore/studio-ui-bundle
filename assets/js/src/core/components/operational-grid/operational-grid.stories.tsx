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
import { createColumnHelper, type RowSelectionState, type ColumnDef } from '@tanstack/react-table'
import { DefaultCell } from '../grid/columns/default-cell'
import { Space } from 'antd'
import { IconButton } from '../icon-button/icon-button'

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
          <OperationalGrid.Grid />
          
          <div style={{ marginTop: 16 }}>
            <OperationalGrid.Operations>
              {(operations) => {
                const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                const hasSelection = selectedCount > 0
                const isMultipleSelection = args.enableMultipleRowSelection === true
                
                return (
                  <Space>
                    <IconButton 
                      icon={{ value: 'new-something' }}
                      onClick={() => operations.addRow({ name: 'New Item', value: '', category: 'New' })}
                    >
                      Add Row
                    </IconButton>
                    {args.enableRowSelection && (
                      <>
                        <IconButton 
                          icon={{ value: 'trash' }}
                          onClick={() => operations.deleteSelectedRows()}
                          disabled={!hasSelection}
                          danger
                        >
                          Delete Selected {isMultipleSelection ? `(${selectedCount})` : ''}
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'close' }}
                          onClick={() => operations.clearSelectedRows()}
                          disabled={!hasSelection}
                        >
                          Clear Selection
                        </IconButton>
                      </>
                    )}
                  </Space>
                )
              }}
            </OperationalGrid.Operations>
          </div>
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

export const WithColumnOperations = {
  render: () => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [data, setData] = useState(initialData)
      const [columns, setColumns] = useState<Array<ColumnDef<Item>>>([
        columnHelper.accessor('name', {
          header: 'Name',
          meta: { editable: true }
        }),
        columnHelper.accessor('value', {
          header: 'Value', 
          cell: info => <DefaultCell {...info} />,
          meta: { editable: true }
        })
      ])
      const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

      const handleColumnsChange = (newColumns: Array<ColumnDef<any>>) => {
        setColumns(newColumns as Array<ColumnDef<Item>>)
      }

      return (
        <OperationalGrid
          value={data}
          columns={columns}
          onChange={setData}
          onColumnsChange={handleColumnsChange}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          enableSorting={true}
          enableRowSelection={true}
          enableMultipleRowSelection={true}
        >
          <OperationalGrid.Grid />
          
          <div style={{ marginTop: 16 }}>
            <OperationalGrid.Operations>
              {(operations) => {
                const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                const hasSelection = selectedCount > 0
                
                return (
                  <Space wrap>
                    <IconButton 
                      icon={{ value: 'new-something' }}
                      onClick={() => operations.addRow({ name: 'New Item', value: '', category: 'New' })}
                    >
                      Add Row
                    </IconButton>
                    <IconButton 
                      icon={{ value: 'trash' }}
                      onClick={() => operations.deleteSelectedRows()}
                      disabled={!hasSelection}
                      danger
                    >
                      Delete Selected ({selectedCount})
                    </IconButton>
                    <IconButton 
                      icon={{ value: 'close' }}
                      onClick={() => operations.clearSelectedRows()}
                      disabled={!hasSelection}
                    >
                      Clear Selection
                    </IconButton>
                    <div style={{ borderLeft: '1px solid #d9d9d9', paddingLeft: 8, marginLeft: 8 }}>
                      <Space>
                        <IconButton 
                          icon={{ value: 'new-column' }}
                          onClick={() => operations.addColumn(
                            columnHelper.accessor('category', {
                              header: 'Category',
                              cell: info => <DefaultCell {...info} />,
                              meta: { editable: true }
                            })
                          )}
                        >
                          Add Category Column
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'delete-column' }}
                          onClick={() => operations.removeColumn('category')}
                          danger
                        >
                          Remove Category Column
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'edit' }}
                          onClick={() => operations.updateColumn('name', 
                            columnHelper.accessor('name', {
                              header: 'Item Name (Updated)',
                              meta: { editable: true }
                            })
                          )}
                        >
                          Update Name Column Header
                        </IconButton>
                      </Space>
                    </div>
                  </Space>
                )
              }}
            </OperationalGrid.Operations>
          </div>
        </OperationalGrid>
      )
    }

    return <ComponentWrapper />
  }
}
