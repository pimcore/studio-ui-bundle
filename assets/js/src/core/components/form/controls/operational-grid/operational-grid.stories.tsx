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
import React, { useState, useCallback } from 'react'
import { Form } from '../../form'
import { OperationalGrid } from '../../../operational-grid/operational-grid'
import { createColumnHelper, type RowSelectionState, type ColumnDef } from '@tanstack/react-table'
import { DefaultCell } from '../../../grid/columns/default-cell'
import { Button, Space, Input, InputNumber, Select, Flex } from 'antd'
import { IconButton } from '../../../icon-button/icon-button'
import { IconTextButton } from '../../../icon-text-button/icon-text-button'
import { Panel } from '../../../panel/panel'
import { BaseView } from '../../../base-view/base-view'
import { FormKit } from '../../form-kit'
import { type DragEndEvent } from '@dnd-kit/core'

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
      <Space direction="vertical" size="small">
        <OperationalGrid.Grid />
        
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
      </Space>
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
      <Space direction="vertical" size="small">
        <OperationalGrid.Grid />
        
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
      </Space>
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
            <Space direction="vertical" size="small">
              <OperationalGrid.Grid />
              
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
                        >
                          Remove Type
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'delete-column' }}
                          onClick={() => operations.removeColumn('category')}
                        >
                          Remove Category
                        </IconButton>
                        <IconButton 
                          icon={{ value: 'delete-column' }}
                          onClick={() => operations.removeColumn('status')}
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
            </Space>
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

interface AssetPermissionItem {
  asset: any
  read: boolean
  write: boolean
  delete: boolean
  publish: boolean
}

interface AssetPermissionGridProps {
  value?: AssetPermissionItem[]
  onChange?: (value: AssetPermissionItem[]) => void
}

const AssetPermissionGrid = ({ value = [], onChange }: AssetPermissionGridProps): React.JSX.Element => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const columnHelper = createColumnHelper<AssetPermissionItem>()

  const columns = [
    // Asset selector column
    columnHelper.accessor('asset', {
      header: 'Asset',
      size: 200,
      cell: info => <DefaultCell {...info} />,
      meta: { 
        editable: true,
        type: 'element',
        config: {
          allowedTypes: ['asset'],
          expectsStringValue: false,
          allowTextInput: false,
          getElementInfo: (props: any) => {
            const value = props.getValue()
            if (!value || typeof value !== 'object') {
              return {
                elementType: undefined,
                id: undefined,
                fullPath: false,
                published: undefined,
                disabled: false
              }
            }
            return {
              elementType: 'asset',
              id: value.id,
              fullPath: value.fullPath || value.path || '',
              published: value.published,
              disabled: false
            }
          }
        }
      }
    }),
    // Checkbox columns
    columnHelper.accessor('read', {
      header: 'Read',
      size: 80,
      cell: info => <DefaultCell {...info} />,
      meta: { 
        editable: true,
        type: 'checkbox',
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('write', {
      header: 'Write', 
      size: 80,
      cell: info => <DefaultCell {...info} />,
      meta: { 
        editable: true,
        type: 'checkbox',
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('delete', {
      header: 'Delete',
      size: 80,
      cell: info => <DefaultCell {...info} />,
      meta: { 
        editable: true,
        type: 'checkbox',
        config: {
          align: 'center'
        }
      }
    }),
    columnHelper.accessor('publish', {
      header: 'Publish',
      size: 80,
      cell: info => <DefaultCell {...info} />,
      meta: { 
        editable: true,
        type: 'checkbox',
        config: {
          align: 'center'
        }
      }
    }),
    // Delete action column
    {
      id: 'actions',
      header: 'Actions',
      size: 60,
      cell: (info: any) => (
        <Flex
          align="center"
          justify="center"
        >
          <IconButton
            icon={{ value: 'trash' }}
            onClick={() => {
              const newValue = [...(value || [])]
              newValue.splice(info.row.index, 1)
              onChange?.(newValue)
            }}
            type="link"
            title="Delete row"
          />
        </Flex>
      ),
      enableResizing: false,
      enableSorting: false
    }
  ]

  return (
    <OperationalGrid
      value={value}
      onChange={onChange}
      columns={columns}
      enableSorting={true}
      enableRowSelection={true}
      enableMultipleRowSelection={true}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
    >
      <Space direction="vertical" size="small">
        <OperationalGrid.Grid />
        
        <OperationalGrid.Operations>
          {(operations) => {
            const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
            const hasSelection = selectedCount > 0
            
            return (
              <Space>
                <IconButton 
                  icon={{ value: 'new-something' }}
                  onClick={() => operations.addRow({ 
                    asset: null, 
                    read: false, 
                    write: false, 
                    delete: false, 
                    publish: false 
                  })}
                >
                  Add Asset Permission
                </IconButton>
                <IconButton 
                  icon={{ value: 'trash' }}
                  onClick={() => operations.deleteSelectedRows()}
                  disabled={!hasSelection}
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
              </Space>
            )
          }}
        </OperationalGrid.Operations>
      </Space>
    </OperationalGrid>
  )
}

export const AssetPermissionExample: StoryObj = {
  render: () => {
    const AssetPermissionExampleComponent = (): React.JSX.Element => {
      const [value, setValue] = useState<AssetPermissionItem[]>([
        { 
          asset: { 
            id: 1, 
            fullPath: '/demo/sample-image.jpg', 
            type: 'image',
            elementType: 'asset',
            published: true
          }, 
          read: true, 
          write: true, 
          delete: false, 
          publish: true 
        },
        { 
          asset: { 
            id: 2, 
            fullPath: '/demo/document.pdf', 
            type: 'document',
            elementType: 'asset',
            published: true
          }, 
          read: true, 
          write: false, 
          delete: false, 
          publish: false 
        }
      ])

      return (
        <div style={{ maxWidth: '1200px', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div>
              <AssetPermissionGrid 
                value={value}
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

    return <AssetPermissionExampleComponent />
  }
}

export const WithPanelLayout: StoryObj = {
  render: () => {
    const PanelLayoutExample = (): React.JSX.Element => {
      const [value, setValue] = useState<BasicItem[]>([
        { name: 'Database Host', value: 'localhost', type: 'text' },
        { name: 'Database Port', value: '3306', type: 'number' },
        { name: 'Cache Enabled', value: 'true', type: 'select' },
        { name: 'Max Connections', value: '100', type: 'number' }
      ])
      const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
      const columnHelper = createColumnHelper<BasicItem>()

      const columns = [
        columnHelper.accessor('name', {
          header: 'Configuration Key',
          size: 200,
          meta: { editable: true }
        }),
        columnHelper.accessor('value', {
          header: 'Value',
          cell: info => <DefaultCell {...info} />,
          meta: { 
            editable: true,
            autoWidth: true
          }
          // This column will auto-expand to fill remaining width
        }),
        columnHelper.accessor('type', {
          header: 'Data Type',
          size: 120,
          cell: info => <DefaultCell {...info} />,
          meta: { editable: true }
        }),
        // Delete action column
        {
          id: 'actions',
          header: 'Actions',
          size: 60,
          cell: (info: any) => (
            <Flex
              align="center"
              justify="center"
            >
              <IconButton
                icon={{ value: 'trash' }}
                onClick={() => {
                  const newValue = [...value]
                  newValue.splice(info.row.index, 1)
                  setValue(newValue)
                }}
                type="link"
                title="Delete row"
              />
            </Flex>
          ),
          enableResizing: false,
          enableSorting: false
        }
      ]

      return (
        <div style={{ maxWidth: '1200px', padding: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div>
              <OperationalGrid
                value={value}
                docked
                onChange={setValue}
                columns={columns}
                enableSorting={true}
                enableRowSelection={true}
                enableMultipleRowSelection={true}
                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
                autoWidth
              >
                <OperationalGrid.Operations>
                  {(operations) => {
                    const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                    const hasSelection = selectedCount > 0
                    
                    const extraContent = (
                      <Space>
                        <IconTextButton 
                          icon={{ value: 'new-something' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            operations.addRow({ 
                              name: 'New Config', 
                              value: '', 
                              type: 'text' 
                            })
                          }}
                        >
                          Add Configuration
                        </IconTextButton>
                        <IconTextButton 
                          icon={{ value: 'trash' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            operations.deleteSelectedRows()
                          }}
                          disabled={!hasSelection}
                        >
                          Delete Selected ({selectedCount})
                        </IconTextButton>
                        <IconTextButton 
                          icon={{ value: 'close' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            operations.clearSelectedRows()
                          }}
                          disabled={!hasSelection}
                        >
                          Clear Selection
                        </IconTextButton>
                      </Space>
                    )

                    return (
                        <FormKit.Panel
                          title="Application Configuration"
                          extra={extraContent}
                          extraPosition="start"
                          border
                          contentPadding="none"
                          theme='default'
                          collapsible
                          collapsed={false}
                        >
                          <OperationalGrid.Grid />
                        </FormKit.Panel>
                    )
                  }}
                </OperationalGrid.Operations>
              </OperationalGrid>
            </div>
            
            <div>
              <h4>Current Configuration Values:</h4>
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

    return <PanelLayoutExample />
  }
}

export const WithDragAndDrop: StoryObj = {
  render: () => {
    const DragAndDropOperationalGrid = ({ value = [], onChange }: { value?: BasicItem[], onChange?: (value: BasicItem[]) => void }): React.JSX.Element => {
      const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
      const [isDragEnabled, setIsDragEnabled] = useState<boolean>(false)
      const columnHelper = createColumnHelper<BasicItem>()

      const columns = [
        columnHelper.accessor('name', {
          header: 'Task Name',
          meta: { editable: true }
        }),
        columnHelper.accessor('value', {
          header: 'Priority',
          cell: info => <DefaultCell {...info} />,
          meta: { editable: true }
        }),
        columnHelper.accessor('type', {
          header: 'Category',
          cell: info => <DefaultCell {...info} />,
          meta: { editable: true }
        })
      ]

      const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event

        if (active.id !== over?.id && value) {
          const oldIndex = value.findIndex((_: any, index: number) => `task-${value[index].name}-${index}` === active.id)
          const newIndex = value.findIndex((_: any, index: number) => `task-${value[index].name}-${index}` === over?.id)

          if (oldIndex !== -1 && newIndex !== -1) {
            const newValue = [...value]
            const [reorderedItem] = newValue.splice(oldIndex, 1)
            newValue.splice(newIndex, 0, reorderedItem)
            onChange?.(newValue)
          }
        }
      }, [value, onChange])

      const toggleDragMode = () => {
        setIsDragEnabled(!isDragEnabled)
        // Clear selections when switching modes
        setSelectedRows({})
      }

      return (
        <OperationalGrid
          value={value}
          onChange={onChange}
          columns={columns}
          enableSorting={false} // Disable sorting to avoid conflicts with drag
          enableRowSelection={!isDragEnabled} // Disable row selection when drag is enabled
          enableMultipleRowSelection={!isDragEnabled}
          enableRowDrag={isDragEnabled}
          handleDragEnd={handleDragEnd}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
          setRowId={(row, index) => `task-${row.name}-${index}`} // Provide stable IDs for drag animation
        >
          <Space direction="vertical" size="small">
            <OperationalGrid.Grid />
            
            <OperationalGrid.Operations>
              {(operations) => {
                const selectedCount = Object.keys(selectedRows).filter(key => selectedRows[key]).length
                const hasSelection = selectedCount > 0
                
                return (
                  <Space wrap>
                    <IconButton 
                      icon={{ value: 'new-something' }}
                      onClick={() => operations.addRow({ 
                        name: `Task ${value.length + 1}`, 
                        value: 'New Priority', 
                        type: 'new' 
                      })}
                    >
                      Add Task
                    </IconButton>
                    
                    <IconButton 
                      icon={{ value: isDragEnabled ? 'drag-option' : 'transfer' }}
                      onClick={toggleDragMode}
                      title={isDragEnabled ? 'Switch to selection mode' : 'Switch to drag mode'}
                    />
                    
                    {!isDragEnabled && (
                      <>
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
                      </>
                    )}
                    
                    <div style={{ borderLeft: '1px solid #d9d9d9', paddingLeft: 8, marginLeft: 8 }}>
                      <IconButton 
                        icon={{ value: 'refresh' }}
                        onClick={() => {
                          const resetTasks = [
                            { name: 'User Research', value: 'High Priority', type: 'development' },
                            { name: 'UI Design', value: 'Medium Priority', type: 'design' },
                            { name: 'Database Schema', value: 'High Priority', type: 'development' },
                            { name: 'API Documentation', value: 'Low Priority', type: 'documentation' },
                            { name: 'Unit Testing', value: 'Medium Priority', type: 'testing' }
                          ]
                          onChange?.(resetTasks)
                          setSelectedRows({}) // Clear selections on reset
                        }}
                      >
                        Reset Order
                      </IconButton>
                    </div>
                  </Space>
                )
              }}
            </OperationalGrid.Operations>
          </Space>
        </OperationalGrid>
      )
    }

    const DragAndDropExample = (): React.JSX.Element => {
      const [form] = Form.useForm()
      const [formValues, setFormValues] = useState({
        tasks: [
          { name: 'User Research', value: 'High Priority', type: 'development' },
          { name: 'UI Design', value: 'Medium Priority', type: 'design' },
          { name: 'Database Schema', value: 'High Priority', type: 'development' },
          { name: 'API Documentation', value: 'Low Priority', type: 'documentation' },
          { name: 'Unit Testing', value: 'Medium Priority', type: 'testing' }
        ]
      })

      const onValuesChange = (changedValues: any, allValues: any) => {
        setFormValues(allValues)
      }

      const onFinish = (values: any) => {
        console.log('Form submitted with reordered tasks:', values)
      }

      return (
        <div style={{ maxWidth: '1200px', padding: '20px' }}>
          <div style={{ marginBottom: 16, padding: 16, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <h4 style={{ margin: 0, marginBottom: 8 }}>Drag & Drop Form Control</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
              Use the "Drag Mode" / "Select Mode" button to switch between drag & drop reordering and row selection for batch operations. 
              The two modes are mutually exclusive to avoid interaction conflicts.
            </p>
          </div>

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
                  label="Project Tasks (Drag to Reorder by Priority)"
                  name="tasks"
                >
                  <DragAndDropOperationalGrid />
                </Form.Item>

                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Save Project Tasks
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

    return <DragAndDropExample />
  }
}
