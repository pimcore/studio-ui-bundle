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
import { ManyToManyRelation, type ManyToManyRelationValue } from '@Pimcore/components/many-to-many-relation'
import { Form } from '../../form'
import { FormKit } from '../../form-kit'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Relation/ManyToManyRelation',
  component: ManyToManyRelation
}

export default config

// Form integration example
interface RelationFormValues {
  primaryRelations: ManyToManyRelationValue | null
  secondaryRelations: ManyToManyRelationValue | null
  optionalRelations: ManyToManyRelationValue | null
}

const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<RelationFormValues>({
    primaryRelations: null,
    secondaryRelations: null,
    optionalRelations: null
  })

  const handleSubmit = (): void => {
    console.log('📝 Form Submitted:', formValues)
    console.table(formValues)
  }

  return (
    <div style={{ maxWidth: '1200px', padding: '20px' }}>
      <FormKit>
        <FormKit.Panel title="Multiple Relations">
          <Form.Item
            label="Primary Relations"
            name="primaryRelations"
            required
            tooltip="Select multiple primary elements for this item"
          >
            <ManyToManyRelation
              allowToClearRelation
              pathFormatterClass={null}
              assetsAllowed
              documentsAllowed
              allowedAssetTypes={['image', 'video', 'document']}
              allowedClasses={['Product', 'Category']}
              allowedDocumentTypes={['page', 'snippet']}
              assetInlineDownloadAllowed
              maxItems={5}
              width="100%"
              height={300}
              onChange={(value) => {
                setFormValues(prev => ({ ...prev, primaryRelations: value ?? null }))
              }}
              value={formValues.primaryRelations}
            />
          </Form.Item>

          <Form.Item
            label="Secondary Relations"
            name="secondaryRelations"
            tooltip="Additional supporting relations"
          >
            <ManyToManyRelation
              allowToClearRelation
              pathFormatterClass={null}
              documentsAllowed
              allowedDocumentTypes={['page', 'folder']}
              maxItems={3}
              width="100%"
              height={200}
              onChange={(value) => {
                setFormValues(prev => ({ ...prev, secondaryRelations: value ?? null }))
              }}
              value={formValues.secondaryRelations}
            />
          </Form.Item>

          <Form.Item
            label="Optional Relations"
            name="optionalRelations"
            tooltip="Any additional element references"
          >
            <ManyToManyRelation
              allowToClearRelation
              pathFormatterClass={null}
              assetsAllowed
              documentsAllowed
              dataObjectsAllowed
              allowedAssetTypes={['image']}
              allowedClasses={['BlogPost', 'News']}
              allowedDocumentTypes={['page']}
              maxItems={10}
              width="100%"
              height={250}
              onChange={(value) => {
                setFormValues(prev => ({ ...prev, optionalRelations: value ?? null }))
              }}
              value={formValues.optionalRelations}
            />
          </Form.Item>
        </FormKit.Panel>

        <FormKit.Panel>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setFormValues({
                primaryRelations: null,
                secondaryRelations: null,
                optionalRelations: null
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

      <div style={{ marginTop: '24px' }}>
        <h4>Current Form Values</h4>
        <div style={{
          background: '#f5f5f5',
          padding: '16px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '12px',
          whiteSpace: 'pre-wrap',
          minHeight: '200px'
        }}>
          {JSON.stringify(formValues, null, 2)}
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          <strong>Form Integration Features:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Multiple relation sets management</li>
            <li>Validation support with required fields</li>
            <li>Tooltip descriptions</li>
            <li>Configurable item limits</li>
            <li>Panel-based organization</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const FormExample = {
  render: () => <FormExampleComponent />
}
