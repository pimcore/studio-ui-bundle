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
import { IconSelector } from './icon-selector'
import React, { useState } from 'react'
import { type ElementIcon } from '@Pimcore/modules/asset/asset-api-slice.gen'
import { Form } from '@sdk/components'
import { FormKit } from '@Pimcore/components/form/form-kit'
import { Content } from '@Pimcore/components/content/content'

const config: Meta = {
  title: 'Components/General/IconSelector',
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
  const currentIcon = Form.useWatch('selectedIcon', form)

  return (
    <div style={ { padding: '20px' } }>
      <div style={ { marginBottom: '20px' } }>
        <p>Current selected icon: <strong>{currentIcon?.value ?? 'None'}</strong></p>

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
