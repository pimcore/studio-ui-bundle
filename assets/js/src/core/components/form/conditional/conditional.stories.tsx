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
import { Conditional } from './conditional'
import { Form } from '../form'
import { FormKit } from '../form-kit'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'

const config: Meta<typeof Conditional> = {
  title: 'Components/Data Entry/Form/Conditional',
  component: Conditional,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Conditional component that renders children based on form values. Useful for creating dynamic forms that show/hide fields based on user input.'
      }
    }
  },
  tags: ['autodocs']
}

export default config
type Story = StoryObj<typeof config>

interface SimpleFormValues {
  showPanel: boolean
  firstName?: string
  lastName?: string
}

const SimpleConditionalComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<SimpleFormValues>({
    showPanel: false
  })

  const onValuesChange = (changedValues: Partial<SimpleFormValues>, allValues: SimpleFormValues): void => {
    setFormValues(allValues)
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit
        formProps={ {
          initialValues: formValues,
          layout: 'vertical',
          onValuesChange
        } }
      >
        <Form.Item
          name="showPanel"
          valuePropName="checked"
        >
          <Switch labelRight="Show user information" />
        </Form.Item>

        <Conditional condition={ (values) => values.showPanel === true }>
          <FormKit.Panel
            title="User Information"
            theme="fieldset"
            border={ true }
          >
            <Form.Item
              label="First Name"
              name="firstName"
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </FormKit.Panel>
        </Conditional>

        <div style={ { marginTop: '20px', fontSize: '14px', color: '#666' } }>
          <strong>Current switch value:</strong> {formValues.showPanel ? 'On' : 'Off'}
          <br />
          <strong>Panel content:</strong> {formValues.showPanel ? 'Visible - contains two input fields' : 'Hidden'}
        </div>
      </FormKit>
    </div>
  )
}

export const SimpleConditional: Story = {
  render: () => <SimpleConditionalComponent />
}

interface SelectFormValues {
  userType: string
  companyName?: string
  schoolName?: string
  jobTitle?: string
}

const SelectConditionalComponent = (): React.JSX.Element => {
  const [formValues, setFormValues] = useState<SelectFormValues>({
    userType: ''
  })

  const onValuesChange = (changedValues: Partial<SelectFormValues>, allValues: SelectFormValues): void => {
    setFormValues(allValues)
  }

  const getActivePanelName = (): string => {
    switch (formValues.userType) {
      case 'student':
        return 'Student Information'
      case 'professional':
        return 'Professional Information'
      case 'business':
        return 'Business Information'
      default:
        return 'None'
    }
  }

  return (
    <div style={ { maxWidth: '600px' } }>
      <FormKit
        formProps={ {
          initialValues: formValues,
          layout: 'vertical',
          onValuesChange
        } }
      >
        <Form.Item
          label="User Type"
          name="userType"
        >
          <Select
            placeholder="Select user type"
            options={ [
              { value: '', label: 'None' },
              { value: 'student', label: 'Student' },
              { value: 'professional', label: 'Professional' },
              { value: 'business', label: 'Business Owner' }
            ] }
          />
        </Form.Item>

        <Conditional condition={ (values) => values.userType === 'student' }>
          <FormKit.Panel
            title="Student Information"
            theme="fieldset"
            border={ true }
          >
            <Form.Item
              label="School Name"
              name="schoolName"
            >
              <Input placeholder="Enter your school name" />
            </Form.Item>
          </FormKit.Panel>
        </Conditional>

        <Conditional condition={ (values) => values.userType === 'professional' }>
          <FormKit.Panel
            title="Professional Information"
            theme="fieldset"
            border={ true }
          >
            <Form.Item
              label="Job Title"
              name="jobTitle"
            >
              <Input placeholder="Enter your job title" />
            </Form.Item>
          </FormKit.Panel>
        </Conditional>

        <Conditional condition={ (values) => values.userType === 'business' }>
          <FormKit.Panel
            title="Business Information"
            theme="fieldset"
            border={ true }
          >
            <Form.Item
              label="Company Name"
              name="companyName"
            >
              <Input placeholder="Enter your company name" />
            </Form.Item>
          </FormKit.Panel>
        </Conditional>

        <div style={ { marginTop: '20px', fontSize: '14px', color: '#666' } }>
          <strong>Selected user type:</strong> {formValues.userType || 'None'}
          <br />
          <strong>Active panel:</strong> {getActivePanelName()}
        </div>
      </FormKit>
    </div>
  )
}

export const SelectConditional: Story = {
  render: () => <SelectConditionalComponent />
}
