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
    },
    title: {
      control: { type: 'text' }
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
            <IconButton
              icon={ { value: 'new' } }
              size="small"
            />
          </Dropdown>
          <IconButton
            icon={ { value: 'chevron-down' } }
            size="small"
          />
          <IconButton
            icon={ { value: 'chevron-up' } }
            size="small"
          />
        </Space>

        <IconButton
          icon={ { value: 'trash' } }
          size="small"
        />
      </Split>
    )
  }
}

export const Inverse: StoryObj<ToolStripProps> = {
  args: {
    theme: 'inverse',
    children: (
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size='mini'>
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
            <IconButton
              icon={ { value: 'new' } }
              size="small"
            />
          </Dropdown>
          <IconButton
            icon={ { value: 'chevron-down' } }
            size="small"
          />
          <IconButton
            icon={ { value: 'chevron-up' } }
            size="small"
          />
        </Space>

        <IconButton
          icon={ { value: 'trash' } }
          size="small"
        />
      </Split>
    )
  }
}

export const WithDragger: StoryObj<ToolStripProps> = {
  args: {
    theme: 'default',
    dragger: true,
    children: (
      <Space size='mini'>
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-down' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-up' } }
          size="small"
        />
      </Space>
    )
  }
}

export const WithTitle: StoryObj<ToolStripProps> = {
  args: {
    theme: 'default',
    title: 'Block Title',
    children: (
      <Space size='mini'>
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-down' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-up' } }
          size="small"
        />
      </Space>
    )
  }
}

export const WithDraggerAndTitle: StoryObj<ToolStripProps> = {
  args: {
    theme: 'default',
    dragger: true,
    title: 'Draggable Block',
    children: (
      <Space size='mini'>
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-down' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-up' } }
          size="small"
        />
      </Space>
    )
  }
}

export const WithDraggerInverse: StoryObj<ToolStripProps> = {
  args: {
    theme: 'inverse',
    dragger: true,
    title: 'Inverse Theme',
    children: (
      <Space size='mini'>
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-down' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-up' } }
          size="small"
        />
      </Space>
    )
  }
}

export const WithDraggerAndDeleteButton: StoryObj<ToolStripProps> = {
  args: {
    theme: 'inverse',
    dragger: {
      listeners: {
        onMouseDown: () => { console.log('Drag started') },
        onTouchStart: () => { console.log('Touch drag started') }
      }
    },
    title: 'Complex Layout',
    children: (
      <Split
        dividerSize='small'
        size='mini'
        theme='secondary'
      >
        <Space size='mini'>
          <IconButton
            icon={ { value: 'new' } }
            size="small"
          />
          <IconButton
            icon={ { value: 'chevron-down' } }
            size="small"
          />
          <IconButton
            icon={ { value: 'chevron-up' } }
            size="small"
          />
        </Space>

        <IconButton
          icon={ { value: 'trash' } }
          size="small"
        />
      </Split>
    )
  }
}

export const WithActivateOnHover: StoryObj<ToolStripProps> = {
  parameters: {
    layout: 'padded'
  },
  render: (args) => (
    <div style={ { width: 'fit-content' } }>
      <ToolStrip { ...args } />
    </div>
  ),
  args: {
    theme: 'default',
    dragger: true,
    title: 'Hover to Activate',
    activateOnHover: true,
    children: (
      <Space size='mini'>
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-down' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'chevron-up' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'trash' } }
          size="small"
        />
      </Space>
    )
  }
}

export const WithActivateOnHoverInverse: StoryObj<ToolStripProps> = {
  parameters: {
    layout: 'padded'
  },
  render: (args) => (
    <div style={ { width: 'fit-content' } }>
      <ToolStrip { ...args } />
    </div>
  ),
  args: {
    theme: 'inverse',
    dragger: true,
    title: 'Hover Inverse',
    activateOnHover: true,
    children: (
      <Space size='mini'>
        <IconButton
          icon={ { value: 'new' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'edit' } }
          size="small"
        />
        <IconButton
          icon={ { value: 'trash' } }
          size="small"
        />
      </Space>
    )
  }
}
