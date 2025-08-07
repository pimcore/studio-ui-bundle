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
import { CreatableSelect } from '@Pimcore/components/creatable-select/creatable-select'
import { Form } from '../../form'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/Basic/CreatableSelect',
  component: CreatableSelect
}

export default config

// Form example
const FormExampleComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState({
    skills: 'javascript',
    tags: ['web-development', 'frontend'],
    departments: 'engineering'
  })

  const onValuesChange = (changedValues: any, allValues: any): void => {
    setFormValues(allValues)
  }

  const skillsOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ]

  const tagsOptions = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'mobile', label: 'Mobile Development' }
  ]

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' }
  ]

  const handleCreateOption = (value: string, field: string): void => {
    console.log(`Created new ${field} option:`, value)
  }

  return (
    <div style={{ maxWidth: '700px', padding: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <Form
            initialValues={formValues}
            layout="vertical"
            onValuesChange={onValuesChange}
          >
            <Form.Item
              label="Primary Skill"
              name="skills"
            >
              <CreatableSelect 
                placeholder="Select or create a skill"
                options={skillsOptions}
                onCreateOption={(value) => handleCreateOption(value, 'skill')}
                allowClear
              />
            </Form.Item>

            <Form.Item
              label="Tags"
              name="tags"
            >
              <CreatableSelect 
                mode="multiple"
                placeholder="Select or create tags"
                options={tagsOptions}
                onCreateOption={(value) => handleCreateOption(value, 'tag')}
                showSearch
                allowDuplicates={false}
              />
            </Form.Item>

            <Form.Item
              label="Department"
              name="departments"
            >
              <CreatableSelect 
                placeholder="Select or create department"
                options={departmentOptions}
                onCreateOption={(value) => handleCreateOption(value, 'department')}
                createOptionLabel="Add custom department"
                size="large"
              />
            </Form.Item>
          </Form>
        </div>

        <div>
          <h4>Current Values</h4>
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

          <h4 style={{ marginTop: '20px' }}>Features</h4>
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div>• <strong>Primary Skill</strong>: Single selection with clear option</div>
            <div>• <strong>Tags</strong>: Multiple selection, no duplicates</div>
            <div>• <strong>Department</strong>: Custom create label, large size</div>
            <div style={{ marginTop: '8px', fontStyle: 'italic' }}>
              Try typing new values that don't exist in the dropdown!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormExample = {
  render: () => <FormExampleComponent />
}
