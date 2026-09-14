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
import { Form } from '../form'
import { Input } from '../../input/input'
import { Select } from '../../select/select'
import { Switch } from '../../switch/switch'
import { FormAnnotationsProvider, type FormAnnotations } from './form-annotations-provider'

const config: Meta<typeof FormAnnotationsProvider> = {
  title: 'Components/Data Entry/Form/Annotations',
  component: FormAnnotationsProvider,
  parameters: {
    docs: {
      story: { height: '320px' },
      description: {
        component: `Marks form items from the outside: every \`Form.Item\` below whose resolved name path is in the
map renders with a status tag and an optional hint, so a form built for editing can be shown as a review without
touching the form. Items are keyed by their resolved name path joined with \`.\` — the path after group and
localized-field context have been applied, not the name the item was written with.`
      }
    }
  }
}

export default config

type Story = StoryObj<typeof FormAnnotationsProvider>

const Fields = (): React.JSX.Element => (
  <Form
    initialValues={ { title: 'Product name', layout: 'default', border: true, inherited: false } }
    layout="vertical"
  >
    <Form.Item
      label="Title"
      name="title"
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Layout"
      name="layout"
    >
      <Select options={ [{ label: 'Default', value: 'default' }, { label: 'Fit', value: 'fit' }] } />
    </Form.Item>

    {/* no label: the control carries its own text, so the tag goes beside the control */}
    <Form.Item name="border">
      <Switch labelRight="Border" />
    </Form.Item>

    <Form.Item name="inherited">
      <Switch labelRight="Inherited" />
    </Form.Item>
  </Form>
)

const story = (annotations: FormAnnotations): Story => ({
  render: () => (
    <FormAnnotationsProvider annotations={ annotations }>
      <Fields />
    </FormAnnotationsProvider>
  )
})

/** every status at once, on labelled and label-less items alike */
export const AllStatuses: Story = story({
  title: { status: 'changed' },
  layout: { status: 'moved' },
  border: { status: 'added' },
  inherited: { status: 'removed' }
})

/** a hint is free text under the control, for whatever the review wants to say about the item */
export const WithHints: Story = story({
  title: { status: 'changed', hint: 'Optional hint text' },
  layout: { status: 'moved', hint: 'A second line of detail' }
})

/** only the named items are marked; the rest render exactly as they always do */
export const PartiallyAnnotated: Story = story({ title: { status: 'changed' } })

/** an empty map is the same form, unmarked */
export const Unannotated: Story = story({})
