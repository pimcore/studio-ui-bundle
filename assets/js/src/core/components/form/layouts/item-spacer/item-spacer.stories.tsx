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
import React from 'react'
import { FormKit } from '../../form-kit'
import { Form } from '../../form'
import { Input } from '@Pimcore/components/input/input'
import { Select } from '@Pimcore/components/select/select'
import { Switch } from '@Pimcore/components/switch/switch'
import { ItemSpacer } from './item-spacer'

const meta: Meta<typeof ItemSpacer> = {
  title: 'Components/Data Entry/Form/Layouts/ItemSpacer',
  component: ItemSpacer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Use `ItemSpacer` to provide consistent vertical spacing between form fields inside a reusable component. ' +
          'It uses `Flex` under the hood (CSS `gap`), which means spacing works correctly even when children are ' +
          'encapsulated in their own components returning bare fragments — the browser applies `gap` to all flex ' +
          'children regardless of the React component tree structure. ' +
          'It is also used internally by `FormKit.Panel` to space its direct children.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Direction of spacing between items',
      defaultValue: 'vertical'
    },
    size: {
      control: 'select',
      options: ['none', 'mini', 'extra-small', 'small', 'normal', 'medium', 'large', 'extra-large', 'maxi'],
      description: 'Gap size between items',
      defaultValue: 'extra-small'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Reusable field group — the canonical use case for ItemSpacer
const AddressFields = (): React.JSX.Element => (
  <FormKit.ItemSpacer>
    <Form.Item
      label="Street"
      name="street"
    >
      <Input placeholder="Enter street" />
    </Form.Item>

    <Form.Item
      label="City"
      name="city"
    >
      <Input placeholder="Enter city" />
    </Form.Item>

    <Form.Item
      label="Country"
      name="country"
    >
      <Select
        options={ [
          { value: 'de', label: 'Germany' },
          { value: 'at', label: 'Austria' },
          { value: 'ch', label: 'Switzerland' }
        ] }
        placeholder="Select country"
      />
    </Form.Item>
  </FormKit.ItemSpacer>
)

// Default — canonical use case: reusable field group inside a Panel
export const Default: Story = {
  render: () => {
    const [form] = Form.useForm()

    return (
      <div style={ { maxWidth: '600px' } }>
        <FormKit formProps={ { form } }>
          <FormKit.Panel title="Shipping Address">
            <AddressFields />
          </FormKit.Panel>
        </FormKit>
      </div>
    )
  }
}

// Standalone — used outside FormKit
export const Standalone: Story = {
  render: () => {
    const [form] = Form.useForm()

    return (
      <div style={ { maxWidth: '600px' } }>
        <Form form={ form }>
          <ItemSpacer>
            <Form.Item
              label="First Name"
              name="firstName"
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
            >
              <Input placeholder="Enter last name" />
            </Form.Item>

            <Form.Item
              label="Active"
              name="active"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </ItemSpacer>
        </Form>
      </div>
    )
  }
}

// Multiple reusable groups inside one Panel
export const MultipleGroups: Story = {
  render: () => {
    const [form] = Form.useForm()

    const ContactFields = (): React.JSX.Element => (
      <FormKit.ItemSpacer>
        <Form.Item
          label="Email"
          name="email"
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </FormKit.ItemSpacer>
    )

    return (
      <div style={ { maxWidth: '600px' } }>
        <FormKit formProps={ { form } }>
          <FormKit.Panel title="Personal Details">
            <AddressFields />
            <ContactFields />
          </FormKit.Panel>
        </FormKit>
      </div>
    )
  }
}

// Horizontal direction
export const Horizontal: Story = {
  render: () => {
    const [form] = Form.useForm()

    return (
      <div style={ { maxWidth: '600px' } }>
        <FormKit formProps={ { form } }>
          <FormKit.Panel title="Name">
            <ItemSpacer direction="horizontal">
              <Form.Item
                label="First Name"
                name="firstName"
              >
                <Input placeholder="First name" />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
              >
                <Input placeholder="Last name" />
              </Form.Item>
            </ItemSpacer>
          </FormKit.Panel>
        </FormKit>
      </div>
    )
  }
}
