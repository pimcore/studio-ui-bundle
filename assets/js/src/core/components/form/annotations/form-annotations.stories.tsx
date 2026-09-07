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
import React from 'react'
import { FormKit } from '../form-kit'
import { Form } from '../form'
import { Input } from '../../input/input'
import { Switch } from '../../switch/switch'
import { FormAnnotationsProvider, type FormAnnotations } from './form-annotations-provider'

const config: Meta<typeof FormAnnotationsProvider> = {
  title: 'Components/Data Entry/Form/Annotations',
  component: FormAnnotationsProvider,
  parameters: {
    docs: {
      description: {
        component: 'Wrap any form in a FormAnnotationsProvider and every Form.Item whose name is in the map renders with a status tint and an optional hint under the control — the form itself needs no change. Built for review surfaces that show a proposed state next to what it replaces.'
      }
    }
  }
}

export default config

const annotations: FormAnnotations = {
  title: { status: 'changed', hint: 'was: Product name' },
  unit: { status: 'added' },
  legacyNotes: { status: 'removed', hint: 'was: free text, 312 values' },
  mandatory: { status: 'moved', hint: 'from: General › Basic data' }
}

export const Default: StoryObj<typeof FormAnnotationsProvider> = {
  render: () => (
    <FormAnnotationsProvider annotations={ annotations }>
      <FormKit formProps={ { disabled: true, initialValues: { name: 'name', title: 'Display name', unit: 'km', legacyNotes: '', mandatory: true } } }>
        <FormKit.Panel title="name (Type: Input)">
          <Form.Item
            label="Name"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Unit"
            name="unit"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Legacy notes"
            name="legacyNotes"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mandatory"
            valuePropName="checked"
          >
            <Switch labelRight="Mandatory" />
          </Form.Item>
        </FormKit.Panel>
      </FormKit>
    </FormAnnotationsProvider>
  )
}
