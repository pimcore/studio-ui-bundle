/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import React, { useState } from 'react'
import { ManyToOneRelation, type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation'
import { Form } from '../../form'
import { FormKit } from '../../form-kit'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Relation/ManyToOneRelation',
  component: ManyToOneRelation
}

export default config

// Form integration example
interface RelationFormValues {
  primaryAsset: ManyToOneRelationValueType
  relatedDocument: ManyToOneRelationValueType
  parentObject: ManyToOneRelationValueType
  optionalReference: ManyToOneRelationValueType
  pathReference: ManyToOneRelationValueType
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<RelationFormValues>({
    primaryAsset: null,
    relatedDocument: null,
    parentObject: null,
    optionalReference: null,
    pathReference: null
  })

  const handleSubmit = (): void => {
    console.log('📝 Form Submitted:', formValues)
    console.table(formValues)
  }

  return (
    <div style={{ maxWidth: '800px', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <FormKit>
            <FormKit.Panel title="Primary Relations">
              <Form.Item
                label="Primary Asset"
                name="primaryAsset"
                required
                tooltip="Select the main asset for this item"
              >
                <ManyToOneRelation
                  allowToClearRelation
                  assetsAllowed
                  allowedAssetTypes={['image', 'video', 'document']}
                  assetInlineDownloadAllowed
                  onChange={(value) => {
                    setFormValues(prev => ({ ...prev, primaryAsset: value }))
                  }}
                  value={formValues.primaryAsset}
                />
              </Form.Item>

              <Form.Item
                label="Related Document"
                name="relatedDocument"
                tooltip="Choose a document that provides additional context"
              >
                <ManyToOneRelation
                  allowToClearRelation
                  documentsAllowed
                  allowedDocumentTypes={['page', 'snippet', 'folder']}
                  onChange={(value) => {
                    setFormValues(prev => ({ ...prev, relatedDocument: value }))
                  }}
                  value={formValues.relatedDocument}
                />
              </Form.Item>

              <Form.Item
                label="Parent Object"
                name="parentObject"
                tooltip="Select the parent object in the hierarchy"
              >
                <ManyToOneRelation
                  allowToClearRelation
                  dataObjectsAllowed
                  allowedClasses={['Category', 'Product', 'User']}
                  onChange={(value) => {
                    setFormValues(prev => ({ ...prev, parentObject: value }))
                  }}
                  value={formValues.parentObject}
                />
              </Form.Item>
            </FormKit.Panel>

            <FormKit.Panel 
              title="Additional Relations"
              theme="fieldset"
            >
              <Form.Item
                label="Optional Reference"
                name="optionalReference"
                tooltip="Any additional element reference"
              >
                <ManyToOneRelation
                  allowToClearRelation
                  assetsAllowed
                  documentsAllowed
                  dataObjectsAllowed
                  allowedAssetTypes={['image', 'document']}
                  allowedClasses={['BlogPost', 'News']}
                  allowedDocumentTypes={['page']}
                  onChange={(value) => {
                    setFormValues(prev => ({ ...prev, optionalReference: value }))
                  }}
                  value={formValues.optionalReference}
                />
              </Form.Item>

              <Form.Item
                label="Path Reference"
                name="pathReference"
                tooltip="Reference that supports manual path input"
              >
                <ManyToOneRelation
                  allowPathTextInput
                  allowToClearRelation
                  assetsAllowed
                  documentsAllowed
                  dataObjectsAllowed
                  allowedAssetTypes={['image']}
                  allowedClasses={['Product']}
                  allowedDocumentTypes={['page']}
                  onChange={(value) => {
                    setFormValues(prev => ({ ...prev, pathReference: value }))
                  }}
                  value={formValues.pathReference}
                />
              </Form.Item>
            </FormKit.Panel>

            <FormKit.Panel>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setFormValues({
                    primaryAsset: null,
                    relatedDocument: null,
                    parentObject: null,
                    optionalReference: null,
                    pathReference: null
                  })}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '6px',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  Reset
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    background: '#1677ff',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  Submit
                </button>
              </div>
            </FormKit.Panel>
          </FormKit>
        </div>

        <div>
          <h4>Current Form Values</h4>
          <div style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            minHeight: '400px'
          }}>
            {JSON.stringify(formValues, null, 2)}
          </div>
          
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            <strong>Form Integration Features:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Seamless FormKit integration</li>
              <li>Validation support with required fields</li>
              <li>Tooltip descriptions</li>
              <li>Responsive layout with proper spacing</li>
              <li>Panel-based organization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormExample = {
  render: () => <FormExampleComponent />
}

// Different field layouts
const FieldLayoutsComponent = (): React.JSX.Element => {
  const [values, setValues] = useState<{
    compact: ManyToOneRelationValueType
    standard: ManyToOneRelationValueType
    wide: ManyToOneRelationValueType
  }>({
    compact: null,
    standard: null,
    wide: null
  })

  const handleChange = (key: keyof typeof values, value: ManyToOneRelationValueType): void => {
    setValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div style={{ maxWidth: '900px', padding: '20px' }}>
      <FormKit>
        <FormKit.Panel title="Field Width Variations">
          <div style={{ display: 'grid', gap: '16px' }}>
            
            <Form.Item
              label="Compact Width"
              tooltip="Small width for sidebar or compact layouts"
            >
              <ManyToOneRelation
                allowToClearRelation
                assetsAllowed
                documentsAllowed
                dataObjectsAllowed
                allowedAssetTypes={['image']}
                allowedClasses={['Category']}
                allowedDocumentTypes={['page']}
                onChange={(value) => handleChange('compact', value)}
                value={values.compact}
                width="small"
              />
            </Form.Item>

            <Form.Item
              label="Standard Width"
              tooltip="Default width for most form fields"
            >
              <ManyToOneRelation
                allowToClearRelation
                assetsAllowed
                documentsAllowed
                dataObjectsAllowed
                allowedAssetTypes={['image', 'document']}
                allowedClasses={['Product', 'Category']}
                allowedDocumentTypes={['page', 'snippet']}
                onChange={(value) => handleChange('standard', value)}
                value={values.standard}
                width="medium"
              />
            </Form.Item>

            <Form.Item
              label="Wide Width"
              tooltip="Full width for detailed forms"
            >
              <ManyToOneRelation
                allowPathTextInput
                allowToClearRelation
                assetsAllowed
                documentsAllowed
                dataObjectsAllowed
                allowedAssetTypes={['image', 'document', 'video']}
                allowedClasses={['Product', 'Category', 'BlogPost']}
                allowedDocumentTypes={['page', 'snippet', 'folder']}
                assetInlineDownloadAllowed
                onChange={(value) => handleChange('wide', value)}
                value={values.wide}
                width="large"
              />
            </Form.Item>
          </div>
        </FormKit.Panel>
      </FormKit>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'inherit' }}>Field Layout Values:</h4>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const FieldLayouts = {
  render: () => <FieldLayoutsComponent />
}

// Validation example
const ValidationExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<{
    requiredRelation: ManyToOneRelationValueType
    conditionalRelation: ManyToOneRelationValueType
    enableConditional: boolean
  }>({
    requiredRelation: null,
    conditionalRelation: null,
    enableConditional: false
  })

  const handleSubmit = async (): Promise<void> => {
    try {
      if (!formValues.requiredRelation) {
        console.log('❌ Form Validation Failed: Required relation is missing')
        return
      }
      
      if (formValues.requiredRelation.textInput === true && !formValues.requiredRelation.fullPath?.trim()) {
        console.log('❌ Form Validation Failed: Path cannot be empty')
        return
      }

      console.log('✅ Form Valid:', formValues)
    } catch (error) {
      console.log('❌ Form Validation Failed:', error)
    }
  }

  return (
    <div style={{ maxWidth: '700px', padding: '20px' }}>
      <FormKit>
        <FormKit.Panel title="Form Validation Example">
          <Form.Item
            label="Required Relation"
            name="requiredRelation"
            required
            rules={[
              {
                required: true,
                message: 'Please select a relation'
              },
              {
                validator: (_, value) => {
                  if (value && value.textInput === true && !value.fullPath?.trim()) {
                    return Promise.reject(new Error('Path cannot be empty'))
                  }
                  return Promise.resolve()
                }
              }
            ]}
            tooltip="This field is required and must have a valid selection"
          >
            <ManyToOneRelation
              allowPathTextInput
              allowToClearRelation
              assetsAllowed
              documentsAllowed
              dataObjectsAllowed
              allowedAssetTypes={['image', 'document']}
              allowedClasses={['Product']}
              allowedDocumentTypes={['page']}
              onChange={(value) => {
                setFormValues(prev => ({ ...prev, requiredRelation: value }))
              }}
              value={formValues.requiredRelation}
            />
          </Form.Item>

          <Form.Item
            label="Enable Additional Relation"
            name="enableConditional"
            valuePropName="checked"
          >
            <input 
              type="checkbox"
              style={{ marginRight: '8px' }}
              checked={formValues.enableConditional}
              onChange={(e) => {
                const checked = e.target.checked
                setFormValues(prev => ({ 
                  ...prev, 
                  enableConditional: checked,
                  conditionalRelation: checked ? prev.conditionalRelation : null
                }))
              }}
            />
            Show additional relation field
          </Form.Item>

          {formValues.enableConditional && (
            <Form.Item
              label="Conditional Relation"
              name="conditionalRelation"
              tooltip="This field is only visible when the checkbox above is checked"
            >
              <ManyToOneRelation
                allowToClearRelation
                assetsAllowed
                dataObjectsAllowed
                allowedAssetTypes={['image']}
                allowedClasses={['Category']}
                onChange={(value) => {
                  setFormValues(prev => ({ ...prev, conditionalRelation: value }))
                }}
                value={formValues.conditionalRelation}
              />
            </Form.Item>
          )}

          <Form.Item>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setFormValues({
                    requiredRelation: null,
                    conditionalRelation: null,
                    enableConditional: false
                  })
                }}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  background: 'white',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#1677ff',
                  color: 'white',
                  cursor: 'pointer'
                }}
                type="button"
              >
                Validate & Submit
              </button>
            </div>
          </Form.Item>
        </FormKit.Panel>
      </FormKit>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '12px'
      }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Validation Features Demonstrated:</h4>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li><strong>Required Fields:</strong> Form validation for mandatory relations</li>
          <li><strong>Custom Validation:</strong> Path validation for text input mode</li>
          <li><strong>Conditional Fields:</strong> Dynamic field visibility based on other inputs</li>
          <li><strong>Error Handling:</strong> User-friendly validation messages</li>
        </ul>
      </div>
    </div>
  )
}

export const ValidationExample = {
  render: () => <ValidationExampleComponent />
}
