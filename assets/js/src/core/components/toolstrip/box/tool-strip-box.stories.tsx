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
import { ToolStripBox, type ToolStripBoxProps } from './tool-strip-box'
import { _default as toolStripStory } from '../tool-strip.stories'
import { ToolStrip } from '../tool-strip'
import { IconButton } from '../../icon-button/icon-button'
import { Space } from '../../space/space'

const config: Meta = {
  title: 'Components/Data Display/ToolStrip/ToolStripBox',
  component: ToolStripBox,
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: (
      <ToolStrip>
        {toolStripStory.args?.children}
      </ToolStrip>
    ),
    children: (
      <span>Content</span>
    )
  }
}

export const ToolStripEnd: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripEnd: (
      <ToolStrip>
        {toolStripStory.args?.children}
      </ToolStrip>
    ),
    children: (
      <span>Content</span>
    )
  }
}

export const ToolStripStartEnd: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: (
      <ToolStrip>
        {toolStripStory.args?.children}
      </ToolStrip>
    ),
    renderToolStripEnd: (
      <ToolStrip>
        {toolStripStory.args?.children}
      </ToolStrip>
    ),
    children: (
      <span>Content</span>
    )
  }
}

export const ToolStripStartEndDocked: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: (
      <ToolStrip>
        {toolStripStory.args?.children}
      </ToolStrip>
    ),
    renderToolStripEnd: (
      <ToolStrip>
        {toolStripStory.args?.children}
      </ToolStrip>
    ),
    docked: true,
    children: (
      <span>Content</span>
    )
  }
}

export const WithDraggerAndTitle: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: (
      <ToolStrip
        dragger
        title="Block Title"
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
      </ToolStrip>
    ),
    children: (
      <div style={ { padding: '16px', background: '#f5f5f5', minHeight: '100px' } }>
        <p>Content area with draggable toolbar above</p>
        <p>This demonstrates how ToolStrip with dragger and title works within ToolStripBox</p>
      </div>
    )
  }
}

export const WithActivateOnHover: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: (
      <ToolStrip
        activateOnHover
        dragger
        title="Hover to Activate"
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
          <IconButton
            icon={ { value: 'trash' } }
            size="small"
          />
        </Space>
      </ToolStrip>
    ),
    children: (
      <div style={ { padding: '20px', background: '#f9f9f9', minHeight: '120px', border: '1px solid #e0e0e0' } }>
        <h3 style={ { margin: '0 0 12px 0', color: '#333' } }>Content Area</h3>
        <p style={ { margin: '0 0 8px 0', color: '#666' } }>This demonstrates the activateOnHover functionality:</p>
        <ul style={ { margin: '0', paddingLeft: '20px', color: '#666' } }>
          <li>Initially shows only dragger and title</li>
          <li>Hover over the toolbar to reveal all action buttons</li>
          <li>Smooth transitions provide polished UX</li>
        </ul>
      </div>
    )
  }
}
