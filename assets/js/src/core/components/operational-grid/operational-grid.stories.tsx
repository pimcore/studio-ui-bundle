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
import { CsvImportButton } from './csv-import-button/csv-import-button'
import { type DragEndEvent } from '@dnd-kit/core'

const config: Meta = {
  title: 'Components/Data Entry/OperationalGrid',
  component: OperationalGrid,

  tags: ['autodocs'],

  render: (args: OperationalGridProps) => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [data, setData] = useState(args.value)
      const [selectedRows, setSelectedRows] = useState(args.selectedRows ?? {})

      const handleChange = (newValue: any[]): void => {
        setData(newValue)
        args.onChange?.(newValue)
      }

      const handleSelectedRowsChange = (newSelectedRows: any): void => {
        setSelectedRows(newSelectedRows as RowSelectionState)
        args.onSelectedRowsChange?.(newSelectedRows as RowSelectionState)
      }

      return (
        <OperationalGrid
          { ...args }
          onChange={ handleChange }
          onSelectedRowsChange={ handleSelectedRowsChange }
          selectedRows={ selectedRows }
          value={ data }
        >
          <OperationalGrid.Grid />

          <div style={ { marginTop: 16 } }>
            <OperationalGrid.Operations>
              {(operations) => {
                const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                const hasSelection = selectedCount > 0
                const isMultipleSelection = args.enableMultipleRowSelection === true

                return (
                  <Space>
                    <IconButton
                      icon={ { value: 'new-something' } }
                      onClick={ () => { operations.addRow({ name: 'New Item', value: '', category: 'New' }) } }
                    >
                      Add Row
                    </IconButton>
                    {args.enableRowSelection === true && (
                      <>
                        <IconButton
                          danger
                          disabled={ !hasSelection }
                          icon={ { value: 'trash' } }
                          onClick={ () => { operations.deleteSelectedRows() } }
                        >
                          Delete Selected {isMultipleSelection ? `(${selectedCount})` : ''}
                        </IconButton>
                        <IconButton
                          disabled={ !hasSelection }
                          icon={ { value: 'close' } }
                          onClick={ () => { operations.clearSelectedRows() } }
                        >
                          Clear Selection
                        </IconButton>
                      </>
                    )}
                    <CsvImportButton />
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
    cell: info => <DefaultCell { ...info } />,
    meta: {
      editable: true
    }
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => <DefaultCell { ...info } />,
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
          cell: info => <DefaultCell { ...info } />,
          meta: { editable: true }
        })
      ])
      const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

      const handleColumnsChange = (newColumns: Array<ColumnDef<any>>): void => {
        setColumns(newColumns as Array<ColumnDef<Item>>)
      }

      return (
        <OperationalGrid
          columns={ columns }
          enableMultipleRowSelection
          enableRowSelection
          enableSorting
          onChange={ setData }
          onColumnsChange={ handleColumnsChange }
          onSelectedRowsChange={ setSelectedRows }
          selectedRows={ selectedRows }
          value={ data }
        >
          <OperationalGrid.Grid />

          <div style={ { marginTop: 16 } }>
            <OperationalGrid.Operations>
              {(operations) => {
                const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                const hasSelection = selectedCount > 0

                return (
                  <Space wrap>
                    <IconButton
                      icon={ { value: 'new-something' } }
                      onClick={ () => { operations.addRow({ name: 'New Item', value: '', category: 'New' }) } }
                    >
                      Add Row
                    </IconButton>
                    <IconButton
                      danger
                      disabled={ !hasSelection }
                      icon={ { value: 'trash' } }
                      onClick={ () => { operations.deleteSelectedRows() } }
                    >
                      Delete Selected ({selectedCount})
                    </IconButton>
                    <IconButton
                      disabled={ !hasSelection }
                      icon={ { value: 'close' } }
                      onClick={ () => { operations.clearSelectedRows() } }
                    >
                      Clear Selection
                    </IconButton>
                    <div style={ { borderLeft: '1px solid #d9d9d9', paddingLeft: 8, marginLeft: 8 } }>
                      <Space>
                        <IconButton
                          icon={ { value: 'new-column' } }
                          onClick={ () => {
                            operations.addColumn(
                              columnHelper.accessor('category', {
                                header: 'Category',
                                cell: info => <DefaultCell { ...info } />,
                                meta: { editable: true }
                              })
                            )
                          } }
                        >
                          Add Category Column
                        </IconButton>
                        <IconButton
                          danger
                          icon={ { value: 'delete-column' } }
                          onClick={ () => { operations.removeColumn('category') } }
                        >
                          Remove Category Column
                        </IconButton>
                        <IconButton
                          icon={ { value: 'edit' } }
                          onClick={ () => {
                            operations.updateColumn('name',
                              columnHelper.accessor('name', {
                                header: 'Item Name (Updated)',
                                meta: { editable: true }
                              })
                            )
                          } }
                        >
                          Update Name Column Header
                        </IconButton>
                      </Space>
                    </div>
                    <CsvImportButton />
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

export const WithDragAndDrop = {
  render: () => {
    const ComponentWrapper = (): React.JSX.Element => {
      const [data, setData] = useState([
        { name: 'Task 1', value: 'High Priority', category: 'Development' },
        { name: 'Task 2', value: 'Medium Priority', category: 'Testing' },
        { name: 'Task 3', value: 'Low Priority', category: 'Documentation' },
        { name: 'Task 4', value: 'High Priority', category: 'Design' },
        { name: 'Task 5', value: 'Medium Priority', category: 'Development' }
      ])
      const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

      const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event

        if (active.id !== over?.id) {
          const oldIndex = data.findIndex((item, index) => String(index) === active.id)
          const newIndex = data.findIndex((item, index) => String(index) === over?.id)

          if (oldIndex !== -1 && newIndex !== -1) {
            const newData = [...data]
            const [reorderedItem] = newData.splice(oldIndex, 1)
            newData.splice(newIndex, 0, reorderedItem)
            setData(newData)
          }
        }
      }

      return (
        <div>
          <div style={ { marginBottom: 16, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 } }>
            <h4 style={ { margin: 0, marginBottom: 8 } }>Drag & Drop Grid</h4>
            <p style={ { margin: 0, fontSize: '14px', color: '#666' } }>
              Use the drag handle (⋮⋮) on the left to reorder rows by dragging them up or down.
            </p>
          </div>

          <OperationalGrid
            columns={ columns }
            enableMultipleRowSelection
            enableRowDrag
            enableRowSelection
            enableSorting={ false }
            handleDragEnd={ handleDragEnd }
            onChange={ setData }
            onSelectedRowsChange={ setSelectedRows }
            selectedRows={ selectedRows }
            value={ data }
          >
            <OperationalGrid.Grid />

            <div style={ { marginTop: 16 } }>
              <OperationalGrid.Operations>
                {(operations) => {
                  const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                  const hasSelection = selectedCount > 0

                  return (
                    <Space>
                      <IconButton
                        icon={ { value: 'new-something' } }
                        onClick={ () => {
                          operations.addRow({
                            name: `Task ${data.length + 1}`,
                            value: 'New Priority',
                            category: 'New Category'
                          })
                        } }
                      >
                        Add Task
                      </IconButton>
                      <IconButton
                        danger
                        disabled={ !hasSelection }
                        icon={ { value: 'trash' } }
                        onClick={ () => { operations.deleteSelectedRows() } }
                      >
                        Delete Selected ({selectedCount})
                      </IconButton>
                      <IconButton
                        disabled={ !hasSelection }
                        icon={ { value: 'close' } }
                        onClick={ () => { operations.clearSelectedRows() } }
                      >
                        Clear Selection
                      </IconButton>
                      <div style={ { borderLeft: '1px solid #d9d9d9', paddingLeft: 8, marginLeft: 8 } }>
                        <IconButton
                          icon={ { value: 'refresh' } }
                          onClick={ () => {
                            setData([
                              { name: 'Task 1', value: 'High Priority', category: 'Development' },
                              { name: 'Task 2', value: 'Medium Priority', category: 'Testing' },
                              { name: 'Task 3', value: 'Low Priority', category: 'Documentation' },
                              { name: 'Task 4', value: 'High Priority', category: 'Design' },
                              { name: 'Task 5', value: 'Medium Priority', category: 'Development' }
                            ])
                          } }
                        >
                          Reset Order
                        </IconButton>
                      </div>
                      <CsvImportButton />
                    </Space>
                  )
                }}
              </OperationalGrid.Operations>
            </div>
          </OperationalGrid>
        </div>
      )
    }

    return <ComponentWrapper />
  }
}
