/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta, type StoryObj } from '@storybook/react'
import React from 'react'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Form } from '@sdk/components'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Content } from '@Pimcore/components/content/content'
import { IconSelector } from '@Pimcore/components/icon-selector/icon-selector'

const config: Meta = {
  title: 'Components/Data Entry/Form/Controls/IconSelector',
  component: IconSelector,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

type Story = StoryObj<typeof config>

interface IconFormData {
  selectedIcon?: ElementIcon
}

const IconSelectorDemo = (): React.JSX.Element => {
  const [form] = Form.useForm<IconFormData>()

  return (
    <div style={ { padding: '20px' } }>
      <div style={ { marginBottom: '20px' } }>
        <FormKit
          formProps={ {
            form,
            layout: 'vertical'
          } }
        >
          <Content padded>
            <Form.Item
              label="Select Icon"
              name="selectedIcon"
            >
              <IconSelector />
            </Form.Item>
          </Content>
        </FormKit>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <IconSelectorDemo />
}
