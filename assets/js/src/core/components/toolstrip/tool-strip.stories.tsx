/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type StoryObj, type Meta } from '@storybook/react'
import { ToolStrip, type ToolStripProps } from './tool-strip'
import { IconButton } from '../icon-button/icon-button'
import { Space } from '../space/space'
import { Text } from '../text/text'
import { Split } from '../split/split'
import { Dropdown } from '../dropdown/dropdown'

const config: Meta = {
  title: 'Components/Data Display/ToolStrip',
  component: ToolStrip,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['default', 'inverse']
    }
  }
}

export default config

export const _default: StoryObj<ToolStripProps> = {
  args: {
    theme: 'default',
    children: (
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size='mini'>
          <IconButton icon={ { value: 'drag-option' } } size="small" />
          <Text>Title</Text>
          <Dropdown menu={ {
            items: [
              {
                key: 0,
                label: 'Action 1'
              },
              {
                key: 1,
                label: 'Action 2'
              }
            ]
          } }
          >
            <IconButton icon={ { value: 'new' } } size="small" />
          </Dropdown>
          <IconButton icon={ { value: 'chevron-down' } } size="small" />
          <IconButton icon={ { value: 'chevron-up' } } size="small" />
        </Space>

        <IconButton icon={ { value: 'trash' } } size="small" />
      </Split>
    )
  }
}

export const inverse: StoryObj<ToolStripProps> = {
  args: {
    theme: 'inverse',
    children: (
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size='mini'>
          <IconButton icon={ { value: 'drag-option' } } size="small" />
          <Text>Title</Text>
          <Dropdown menu={ {
            items: [
              {
                key: 0,
                label: 'Action 1'
              },
              {
                key: 1,
                label: 'Action 2'
              }
            ]
          } }
          >
            <IconButton icon={ { value: 'new' } } size="small" />
          </Dropdown>
          <IconButton icon={ { value: 'chevron-down' } } size="small" />
          <IconButton icon={ { value: 'chevron-up' } } size="small" />
        </Space>

        <IconButton icon={ { value: 'trash' } } size="small" />
      </Split>
    )
  }
}
