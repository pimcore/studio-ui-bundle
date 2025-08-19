/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react/*'
import React, { useState } from 'react'
import { ManyToOneRelation, type ManyToOneRelationProps, type ManyToOneRelationValueType } from './many-to-one-relation'
import { FieldWidthProvider } from '@Pimcore/modules/element/dynamic-types/definitions/objects/data-related/providers/field-width/field-width-provider'
import { Content } from '../content/content'
import { ContentLayout } from '../content-layout/content-layout'
import { Toolbar } from '../toolbar/toolbar'
import { Button } from '../button/button'

const config: Meta<typeof ManyToOneRelation> = {
  title: 'Components/Data Entry/Relation/ManyToOneRelation',
  component: ManyToOneRelation,
  parameters: {
    docs: {
      description: {
        component: `The ManyToOneRelation component provides a unified interface for creating relationships between elements (assets, documents, and objects). It supports drag-and-drop, element selector, and optional text input modes.

**Key Features:**
- **Drag & Drop**: Elements can be dropped directly onto the component
- **Element Selector**: Built-in element selector for browsing and selecting elements
- **Path Text Input**: Optional mode for entering paths manually as text
- **Asset Downloads**: Inline download functionality for asset elements
- **Type Validation**: Configurable allowed types for each element category
- **Width Customization**: Flexible width configuration with field width provider integration

**Use Cases:**
- Object relation fields in data objects
- Document references in content management
- Asset linking in galleries and media sections
- Any scenario requiring element-to-element relationships`
      }
    }
  },
  decorators: [
    (Story) => (
      <FieldWidthProvider fieldWidthValues={{ small: 200, medium: 300, large: 900 }}>
        <Story />
      </FieldWidthProvider>
    )
  ],
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

// Basic usage
const BasicExample = (): React.JSX.Element => {
  const [value, setValue] = useState<ManyToOneRelationValueType>(null)

  return (
    <div style={{ maxWidth: '600px', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h4>Many-to-One Relation</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image', 'document', 'video']}
            allowedClasses={['Product', 'Category', 'User']}
            allowedDocumentTypes={['page', 'snippet']}
            onChange={setValue}
            value={value}
          />
          
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            <strong>Instructions:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Use the selector button to browse and choose elements</li>
              <li>Drag and drop elements from other parts of the interface</li>
              <li>Click the open button to view the selected element</li>
              <li>Use the trash button to clear the selection</li>
            </ul>
          </div>
        </div>

        <div>
          <h4>Current Value</h4>
          <div style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            minHeight: '100px'
          }}>
            {JSON.stringify(value, null, 2) || 'null'}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Basic: Story = {
  render: () => <BasicExample />,
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the ManyToOneRelation component with standard configuration. Supports assets, documents, and objects with configurable allowed types.'
      }
    }
  }
}

// With different configurations
const ConfigurationsExample = (): React.JSX.Element => {
  const [values, setValues] = useState<{
    assetsOnly: ManyToOneRelationValueType
    documentsOnly: ManyToOneRelationValueType
    objectsOnly: ManyToOneRelationValueType
    withTextInput: ManyToOneRelationValueType
    withDownload: ManyToOneRelationValueType
    readOnly: ManyToOneRelationValueType
  }>({
    assetsOnly: null,
    documentsOnly: null,
    objectsOnly: null,
    withTextInput: null,
    withDownload: null,
    readOnly: {
      type: 'document',
      id: 123,
      fullPath: '/sample/document/path',
      subtype: 'page',
      isPublished: true
    }
  })

  const handleChange = (key: keyof typeof values, value: ManyToOneRelationValueType): void => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <ContentLayout
      renderToolbar={
        <Toolbar justify="space-between">
          <div><strong>ManyToOneRelation Configurations</strong></div>
          <Button
            onClick={() => {
              console.log('📝 All Relation Values:', values)
              console.table(values)
            }}
            type="primary"
          >
            View All Values
          </Button>
        </Toolbar>
      }
    >
      <Content padded>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          
          {/* Assets Only */}
          <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Assets Only</h4>
            <ManyToOneRelation
              allowToClearRelation
              allowedAssetTypes={['image', 'document', 'video', 'audio']}
              assetsAllowed
              onChange={(value) => handleChange('assetsOnly', value)}
              value={values.assetsOnly}
            />
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              Only allows asset selection
            </p>
          </div>

          {/* Documents Only */}
          <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Documents Only</h4>
            <ManyToOneRelation
              allowToClearRelation
              documentsAllowed
              allowedDocumentTypes={['page', 'snippet', 'folder']}
              onChange={(value) => handleChange('documentsOnly', value)}
              value={values.documentsOnly}
            />
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              Only allows document selection
            </p>
          </div>

          {/* Objects Only */}
          <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Objects Only</h4>
            <ManyToOneRelation
              allowToClearRelation
              dataObjectsAllowed
              allowedClasses={['Product', 'Category', 'User', 'BlogPost']}
              onChange={(value) => handleChange('objectsOnly', value)}
              value={values.objectsOnly}
            />
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              Only allows object selection
            </p>
          </div>

          {/* With Path Text Input */}
          <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>With Path Text Input</h4>
            <ManyToOneRelation
              allowPathTextInput
              allowToClearRelation
              assetsAllowed
              documentsAllowed
              dataObjectsAllowed
              allowedAssetTypes={['image', 'document']}
              allowedClasses={['Product']}
              allowedDocumentTypes={['page']}
              onChange={(value) => handleChange('withTextInput', value)}
              value={values.withTextInput}
            />
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              Allows manual path text input
            </p>
          </div>

          {/* With Asset Download */}
          <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>With Asset Download</h4>
            <ManyToOneRelation
              allowToClearRelation
              assetsAllowed
              allowedAssetTypes={['image', 'document', 'video']}
              assetInlineDownloadAllowed
              onChange={(value) => handleChange('withDownload', value)}
              value={values.withDownload}
            />
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              Includes download button for assets
            </p>
          </div>

          {/* Read Only */}
          <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Read Only</h4>
            <ManyToOneRelation
              assetsAllowed
              documentsAllowed
              dataObjectsAllowed
              allowedAssetTypes={['image']}
              allowedClasses={['Product']}
              allowedDocumentTypes={['page']}
              onChange={(value) => handleChange('readOnly', value)}
              readOnly
              value={values.readOnly}
            />
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              Read-only mode with pre-filled value
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace'
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontFamily: 'inherit' }}>Current Values:</h4>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      </Content>
    </ContentLayout>
  )
}

export const Configurations: Story = {
  render: () => <ConfigurationsExample />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Showcase of different ManyToOneRelation configurations: assets-only, documents-only, objects-only, with path text input, with asset download functionality, and read-only mode. Each configuration demonstrates specific use cases and feature combinations.'
      }
    }
  }
}

// Width variations
const WidthVariationsExample = (): React.JSX.Element => {
  const [values, setValues] = useState<{
    small: ManyToOneRelationValueType
    medium: ManyToOneRelationValueType
    large: ManyToOneRelationValueType
    fixedPixel: ManyToOneRelationValueType
    percentage: ManyToOneRelationValueType
  }>({
    small: null,
    medium: null,
    large: null,
    fixedPixel: null,
    percentage: null
  })

  const handleChange = (key: keyof typeof values, value: ManyToOneRelationValueType): void => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div style={{ maxWidth: '800px', padding: '20px' }}>
      <h3 style={{ marginBottom: '24px' }}>Width Variations</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Small Width */}
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>Small Width (field width provider)</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('small', value)}
            value={values.small}
            width="small"
          />
        </div>

        {/* Medium Width */}
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>Medium Width (field width provider)</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('medium', value)}
            value={values.medium}
            width="medium"
          />
        </div>

        {/* Large Width */}
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>Large Width (field width provider)</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('large', value)}
            value={values.large}
            width="large"
          />
        </div>

        {/* Fixed Pixel Width */}
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>Fixed Pixel Width (400px)</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('fixedPixel', value)}
            value={values.fixedPixel}
            width={400}
          />
        </div>

        {/* Percentage Width */}
        <div>
          <h4 style={{ margin: '0 0 8px 0' }}>Percentage Width (75%)</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('percentage', value)}
            value={values.percentage}
            width="75%"
          />
        </div>
      </div>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Width Configuration Options:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li><strong>Field Width Provider:</strong> "small", "medium", "large" (uses provider values)</li>
          <li><strong>Fixed Pixel:</strong> Number values (e.g., 400)</li>
          <li><strong>CSS String:</strong> Any valid CSS dimension (e.g., "75%", "20em")</li>
        </ul>
      </div>
    </div>
  )
}

export const WidthVariations: Story = {
  render: () => <WidthVariationsExample />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates different width configuration options for the ManyToOneRelation component. Shows field width provider values (small, medium, large), fixed pixel widths, and CSS percentage widths.'
      }
    }
  }
}

// State variations
const StateVariationsExample = (): React.JSX.Element => {
  const [values, setValues] = useState<{
    normal: ManyToOneRelationValueType
    disabled: ManyToOneRelationValueType
    inherited: ManyToOneRelationValueType
    withValue: ManyToOneRelationValueType
    textInputValue: ManyToOneRelationValueType
  }>({
    normal: null,
    disabled: null,
    inherited: null,
    withValue: {
      type: 'asset',
      id: 456,
      fullPath: '/sample/asset/image.jpg',
      subtype: 'image',
      isPublished: true
    },
    textInputValue: {
      textInput: true,
      fullPath: '/custom/path/to/element'
    }
  })

  const handleChange = (key: keyof typeof values, value: ManyToOneRelationValueType): void => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div style={{ maxWidth: '600px', padding: '20px' }}>
      <h3 style={{ marginBottom: '24px' }}>Component States</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Normal State */}
        <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Normal State</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image', 'document']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('normal', value)}
            value={values.normal}
          />
        </div>

        {/* Disabled State */}
        <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Disabled State</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image', 'document']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            disabled
            onChange={(value) => handleChange('disabled', value)}
            value={values.disabled}
          />
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
            All interactions disabled
          </p>
        </div>

        {/* Inherited State */}
        <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Inherited State</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image', 'document']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            inherited
            onChange={(value) => handleChange('inherited', value)}
            value={values.inherited}
          />
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
            Shows inherited visual styling
          </p>
        </div>

        {/* With Existing Value */}
        <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>With Existing Value</h4>
          <ManyToOneRelation
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image', 'document']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            assetInlineDownloadAllowed
            onChange={(value) => handleChange('withValue', value)}
            value={values.withValue}
          />
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
            Pre-filled with an asset value, shows download button
          </p>
        </div>

        {/* Text Input Value */}
        <div style={{ padding: '16px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 12px 0' }}>Text Input Value</h4>
          <ManyToOneRelation
            allowPathTextInput
            allowToClearRelation
            assetsAllowed
            documentsAllowed
            dataObjectsAllowed
            allowedAssetTypes={['image', 'document']}
            allowedClasses={['Product']}
            allowedDocumentTypes={['page']}
            onChange={(value) => handleChange('textInputValue', value)}
            value={values.textInputValue}
          />
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
            Shows text input mode with custom path
          </p>
        </div>
      </div>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'inherit' }}>Current Values:</h4>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const StateVariations: Story = {
  render: () => <StateVariationsExample />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates different component states: normal, disabled, inherited, with existing values, and text input mode. Shows how the component adapts its appearance and behavior based on props and current value state.'
      }
    }
  }
}
