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

const config: Meta = {
  title: 'Components/Data Display/ToolStrip/ToolStripBox',
  component: ToolStripBox,
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: toolStripStory.args?.children,
    children: (
      <span>Content</span>
    )
  }
}

export const ToolStripEnd: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripEnd: toolStripStory.args?.children,
    children: (
      <span>Content</span>
    )
  }
}

export const ToolStripStartEnd: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: toolStripStory.args?.children,
    renderToolStripEnd: toolStripStory.args?.children,
    children: (
      <span>Content</span>
    )
  }
}

export const ToolStripStartEndDocked: StoryObj<ToolStripBoxProps> = {
  args: {
    renderToolStripStart: toolStripStory.args?.children,
    renderToolStripEnd: toolStripStory.args?.children,
    docked: true,
    children: (
      <span>Content</span>
    )
  }
}
