/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Form } from '../../form'
import { OperationalGrid } from '../../../operational-grid/operational-grid'
import { createColumnHelper, type RowSelectionState, type ColumnDef } from '@tanstack/react-table'
import { DefaultCell } from '../../../grid/columns/default-cell'
import { Button, Space, Input, InputNumber, Select } from 'antd'
import { IconButton } from '../../../icon-button/icon-button'

const config: Meta<typeof OperationalGrid> = {
  title: 'Components/Data Entry/Form/Controls/Composite/OperationalGrid',
  component: OperationalGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**OperationalGrid** is a powerful form component that combines a data grid with operational controls for managing tabular data.

It provides a comprehensive solution for:

- **Interactive data grids** with inline editing capabilities
- **Row management** through programmable operations (add, remove, modify)
- **Cell-level validation** and change tracking
- **Complex data structures** with multiple column types
- **Form integration** with seamless data binding

The component integrates seamlessly with the Pimcore Form system and provides a flexible API for building dynamic data entry interfaces. It's particularly useful for managing collections of structured data like settings, metadata, product variants, or any tabular configuration data.

**Key Features:**
- Editable cells with real-time updates
- Add/remove operations with custom logic
- Row selection and multi-row operations  
- Cell modification tracking and visual feedback
- Sortable columns and advanced grid features
- Customizable column types and rendering

**Note**: This component provides both the grid display and operational controls, making it ideal for forms that need to manage dynamic lists of structured data.
        `
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Wrapper component for additional state management
interface BasicItem {
  name: string
  value: string
  type: string
}

interface BasicOperationalGridProps {
  value?: BasicItem[]
  onChange?: (value: BasicItem[]) => void
  enableMultipleRowSelection?: boolean
}

const BasicOperationalGrid = ({ value = [], onChange, enableMultipleRowSelection = true }: BasicOperationalGridProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const columnHelper = createColumnHelper<BasicItem>()

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      meta: { editable: true }
    }),
    columnHelper.accessor('value', {
      header: 'Value',
      cell: info => <DefaultCell {...info} />,
      meta: { editable: true }
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: info => <DefaultCell {...info} />,
      meta: { editable: true }
    })
  ]

  return (
    <OperationalGrid
      value={value}
      onChange={onChange}
      columns={columns}
      enableSorting={true}
      enableRowSelection={true}
      enableMultipleRowSelection={enableMultipleRowSelection}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    >
      <OperationalGrid.Grid />
      
      <div style={{ marginTop: 16 }}>
        <OperationalGrid.Operations>
          {(operations) => {
            const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
            const hasSelection = selectedCount > 0
            
            return (
              <Space>
                <IconButton 
                  icon={{ value: 'new-something' }}
                  onClick={() => operations.addRow({ 
                    name: 'New Setting', 
                    value: '', 
                    type: 'text' 
                  })}
                >
                  Add Item
                </IconButton>
                <IconButton 
                  icon={{ value: 'trash' }}
                  onClick={() => operations.deleteSelectedRows()}
                  disabled={!hasSelection}
                  danger
                >
                  Delete Selected {enableMultipleRowSelection ? `(${selectedCount})` : ''}
                </IconButton>
                <IconButton 
                  icon={{ value: 'close' }}
                  onClick={() => operations.clearSelectedRows()}
                  disabled={!hasSelection}
                >
                  Clear Selection
                </IconButton>
              </Space>
            )
          }}
        </OperationalGrid.Operations>
      </div>
    </OperationalGrid>
  )
}

// Basic form integration example
interface BasicFormValues {
  items: BasicItem[]
}

const BasicFormExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<BasicFormValues>({
    items: [
      { name: 'Setting 1', value: 'Value 1', type: 'text' },
      { name: 'Setting 2', value: '42', type: 'number' },
      { name: 'Setting 3', value: 'Value 3', type: 'text' }
    ]
  })

  const onFinish = (values: BasicFormValues): void => {
    console.log('Form submitted:', values)
  }

  const onValuesChange = (changedValues: Partial<BasicFormValues>, allValues: BasicFormValues): void => {
    console.log('Values changed:', { changedValues, allValues })
    setFormValues(allValues)
  }

  return (
    <div style={{ maxWidth: '1000px', padding: '20px' }}>
      <h3>Basic Form Integration</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <Form
            form={form}
            initialValues={formValues}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Configuration Items"
              name="items"
            >
              <BasicOperationalGrid />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Save Configuration
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const BasicFormIntegration: StoryObj = {
  render: () => <BasicFormExampleComponent />
}

// Advanced wrapper component with validation and complex fields
interface AdvancedItem {
  name: string
  value: string | number
  type: 'text' | 'number' | 'select'
}

interface AdvancedOperationalGridProps {
  value?: AdvancedItem[]
  onChange?: (value: AdvancedItem[]) => void
  enableMultipleRowSelection?: boolean
}

const AdvancedOperationalGrid = ({ value = [], onChange, enableMultipleRowSelection = true }: AdvancedOperationalGridProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const columnHelper = createColumnHelper<AdvancedItem>()

  const columns = [
    columnHelper.accessor('name', {
      header: 'Configuration Name',
      meta: { editable: true }
    }),
    columnHelper.accessor('value', {
      header: 'Value',
      cell: info => <DefaultCell {...info} />,
      meta: { editable: true }
    }),
    columnHelper.accessor('type', {
      header: 'Type',
      cell: info => <DefaultCell {...info} />
    })
  ]

  return (
    <OperationalGrid
      value={value}
      onChange={onChange}
      columns={columns}
      enableSorting={true}
      enableRowSelection={true}
      enableMultipleRowSelection={enableMultipleRowSelection}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    >
      <OperationalGrid.Grid />
      
      <div style={{ marginTop: 16 }}>
        <OperationalGrid.Operations>
          {(operations) => {
            const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
            const hasSelection = selectedCount > 0
            
            return (
              <Space>
                <IconButton 
                  icon={{ value: 'new-something' }}
                  onClick={() => operations.addRow({
                    name: 'New Setting',
                    value: '',
                    type: 'text'
                  })}
                >
                  Add Setting
                </IconButton>
                <IconButton 
                  icon={{ value: 'trash' }}
                  onClick={() => operations.deleteSelectedRows()}
                  disabled={!hasSelection}
                  danger
                >
                  Delete Selected {enableMultipleRowSelection ? `(${selectedCount})` : ''}
                </IconButton>
                <IconButton 
                  icon={{ value: 'close' }}
                  onClick={() => operations.clearSelectedRows()}
                  disabled={!hasSelection}
                >
                  Clear Selection
                </IconButton>
              </Space>
            )
          }}
        </OperationalGrid.Operations>
      </div>
    </OperationalGrid>
  )
}

// Advanced form with validation and complex fields
interface AdvancedFormValues {
  configuration: AdvancedItem[]
}

const AdvancedFormExampleComponent = (): React.JSX.Element => {
  const [form] = Form.useForm()
  const [formValues, setFormValues] = useState<AdvancedFormValues>({
    configuration: [
      { name: 'API Endpoint', value: 'https://api.example.com', type: 'text' },
      { name: 'Timeout', value: 5000, type: 'number' }
    ]
  })

  return (
    <div style={{ maxWidth: '1000px', padding: '20px' }}>
      <h3>Simple Form with Operations</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <Form
            form={form}
            initialValues={formValues}
            layout="vertical"
            onFinish={(values) => console.log('Form submitted:', values)}
            onValuesChange={(_, allValues) => setFormValues(allValues)}
          >
            <Form.Item
              label="Configuration Settings"
              name="configuration"
            >
              <AdvancedOperationalGrid />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Save Configuration
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Form Values:</h4>
          <div style={{
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '11px',
            whiteSpace: 'pre-wrap',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {JSON.stringify(formValues, null, 2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export const AdvancedFormValidation: StoryObj = {
  render: () => <AdvancedFormExampleComponent />
}

export const SingleRowSelection: StoryObj = {
  render: () => {
    const SingleRowSelectionExample = (): React.JSX.Element => {
      const [value, setValue] = useState<BasicItem[]>([
        { name: 'Setting 1', value: 'Value 1', type: 'text' },
        { name: 'Setting 2', value: '42', type: 'number' },
        { name: 'Setting 3', value: 'Value 3', type: 'text' }
      ])

      return (
        <div style={{ maxWidth: '1000px', padding: '20px' }}>
          <h3>Single Row Selection Example</h3>
          <p>This example demonstrates single row selection mode where only one row can be selected at a time.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div>
              <BasicOperationalGrid 
                value={value}
                enableMultipleRowSelection={false}
                onChange={setValue}
              />
            </div>
            
            <div>
              <h4>Current Form Values:</h4>
              <div style={{
                background: '#f5f5f5',
                padding: '16px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {JSON.stringify(value, null, 2)}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <SingleRowSelectionExample />
  }
}

export const MultipleRowSelection: StoryObj = {
  render: () => {
    const MultipleRowSelectionExample = (): React.JSX.Element => {
      const [value, setValue] = useState<AdvancedItem[]>([
        { name: 'Config 1', value: 'Value 1', type: 'text' },
        { name: 'Config 2', value: '42', type: 'number' },
        { name: 'Config 3', value: 'Value 3', type: 'text' }
      ])

      return (
        <div style={{ maxWidth: '1000px', padding: '20px' }}>
          <h3>Multiple Row Selection Example</h3>
          <p>This example demonstrates multiple row selection mode where multiple rows can be selected simultaneously.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div>
              <AdvancedOperationalGrid 
                value={value}
                enableMultipleRowSelection={true}
                onChange={setValue}
              />
            </div>
            
            <div>
              <h4>Current Form Values:</h4>
              <div style={{
                background: '#f5f5f5',
                padding: '16px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {JSON.stringify(value, null, 2)}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <MultipleRowSelectionExample />
  }
}

export const WithColumnOperations: StoryObj = {
  render: () => {
    const ColumnOperationsExample = (): React.JSX.Element => {
      const [data, setData] = useState<BasicItem[]>([
        { name: 'Item 1', value: 'Value 1', type: 'text' },
        { name: 'Item 2', value: 'Value 2', type: 'number' }
      ])
      const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
      const columnHelper = createColumnHelper<BasicItem>()
      
      const [columns, setColumns] = useState([
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

      const handleColumnsChange = (newColumns: any[]) => {
        setColumns(newColumns)
      }

      return (
        <div style={{ maxWidth: '1200px', padding: '20px' }}>
          <h3>Column Operations Example</h3>
          <p>This example demonstrates adding, removing, and updating columns dynamically.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
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
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                      <Space>
                        <IconButton 
                          icon={{ value: 'new-something' }}
                          onClick={() => operations.addRow({ name: 'New Item', value: '', type: 'text' })}
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
                      </Space>
                      
                      <div style={{ width: 1, height: 24, backgroundColor: '#d9d9d9', margin: '0 8px' }} />
                      
                      <Space>
                        <IconButton 
                          icon={{ value: 'new-column' }}
                          onClick={() => operations.addColumn(
                            columnHelper.accessor('type', {
                              header: 'Type',
                              cell: info => <DefaultCell {...info} />,
                              meta: { editable: true }
                            })
                          )}
                        >
                          Add Type Column
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'new-column' }}
                          onClick={() => operations.addColumn(
                            columnHelper.accessor('category' as any, {
                              header: 'Category (Missing)',
                              cell: info => <DefaultCell {...info} />,
                              meta: { editable: true }
                            }),
                            null // Default value for existing rows
                          )}
                        >
                          Add Column (null)
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'new-column' }}
                          onClick={() => operations.addColumn(
                            columnHelper.accessor('status' as any, {
                              header: 'Status',
                              cell: info => <DefaultCell {...info} />,
                              meta: { editable: true }
                            }),
                            'pending' // Default value for existing rows
                          )}
                        >
                          Add Column (default)
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'delete-column' }}
                          onClick={() => operations.removeColumn('type')}
                          danger
                        >
                          Remove Type
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'delete-column' }}
                          onClick={() => operations.removeColumn('category')}
                          danger
                        >
                          Remove Category
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'delete-column' }}
                          onClick={() => operations.removeColumn('status')}
                          danger
                        >
                          Remove Status
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
                          Update Name Header
                        </IconButton>
                      </Space>
                    </div>
                  )
                }}
              </OperationalGrid.Operations>
            </div>
          </OperationalGrid>
        </div>            <div>
              <h4>Current Form Values:</h4>
              <div style={{
                background: '#f5f5f5',
                padding: '16px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre-wrap',
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                {JSON.stringify(data, null, 2)}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return <ColumnOperationsExample />
  }
}
