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
import { Form } from '../../../form'
import { Input } from '../../../../input/input'
import { Tag } from '../../../../tag/tag'
import { VirtualItem } from '../../virtual-item'
import { useItemOptional } from '../item/use-item'
import { LabelExtraProvider } from './label-extra-provider'

const config: Meta<typeof LabelExtraProvider> = {
  title: 'Components/Data Entry/Form/Label Extra',
  component: LabelExtraProvider,
  parameters: {
    docs: {
      description: {
        component: `Renders a node at the very end of the label row of every form item below — after the label, the
tooltip icon and the required mark. Both label implementations render the slot: the Ant \`Form.Item\` and the
\`VirtualItem\` of the keyed and numbered lists. The same node goes into every label, so it decides itself whether it
applies to the item at hand, e.g. through \`useItemOptional()\`. Without a provider, or with \`null\` as extra, the
slot renders nothing.`
      }
    }
  }
}

export default config

type Story = StoryObj<typeof LabelExtraProvider>

const Extra = (): React.JSX.Element => <Tag color="processing">extra</Tag>

const AntItems = (): React.JSX.Element => (
  <Form
    initialValues={ { title: 'Product name', sku: 'SKU-1' } }
    layout="vertical"
  >
    <Form.Item
      label="Title"
      name="title"
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="SKU"
      name="sku"
      required
      tooltip="Stock keeping unit"
    >
      <Input />
    </Form.Item>
  </Form>
)

const VirtualItems = (): React.JSX.Element => (
  <>
    <VirtualItem
      label="Title"
      name="title"
    >
      <Input defaultValue="Product name" />
    </VirtualItem>

    <VirtualItem
      label="SKU"
      name="sku"
      required
      tooltip="Stock keeping unit"
    >
      <Input defaultValue="SKU-1" />
    </VirtualItem>
  </>
)

/** Ant form items: the extra follows the label, the tooltip icon and the required mark. */
export const AntFormItem: Story = {
  render: () => (
    <LabelExtraProvider extra={ <Extra /> }>
      <AntItems />
    </LabelExtraProvider>
  )
}

/** Virtual items, as the keyed and numbered lists render them: the same slot at the end of the label row. */
export const VirtualFormItem: Story = {
  render: () => (
    <LabelExtraProvider extra={ <Extra /> }>
      <VirtualItems />
    </LabelExtraProvider>
  )
}

const SkuOnlyExtra = (): React.JSX.Element | null => {
  const item = useItemOptional()

  return item?.name === 'sku' ? <Extra /> : null
}

/** The extra reads the item context and only renders for the item it applies to. */
export const DecidedPerItem: Story = {
  render: () => (
    <LabelExtraProvider extra={ <SkuOnlyExtra /> }>
      <AntItems />
    </LabelExtraProvider>
  )
}

/** `null` as extra: the labels render as without a provider. */
export const NullExtra: Story = {
  render: () => (
    <LabelExtraProvider extra={ null }>
      <AntItems />
    </LabelExtraProvider>
  )
}

/** No provider: the slot renders nothing. */
export const WithoutProvider: Story = {
  render: () => <AntItems />
}
