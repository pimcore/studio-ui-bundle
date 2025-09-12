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
import { Typography } from 'antd'

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

const IconSelectorDemo = (): React.JSX.Element => {
  const [selectedIcon, setSelectedIcon] = useState<ElementIcon | undefined>()

  return (
    <div style={ { padding: '20px' } }>
        <div>
          <Typography.Text strong>Icon Selector:</Typography.Text>
          <div style={ { marginTop: '8px' } }>
            <IconSelector
              value={selectedIcon}
              onChange={setSelectedIcon}
            />
          </div>
        </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <IconSelectorDemo />
}
