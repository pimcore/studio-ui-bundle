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
import { Background } from './background'

const config: Meta<typeof Background> = {
  title: 'Components/Visuals/Background',
  component: Background,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

type Story = StoryObj<typeof Background>

export const _default: Story = {
  args: {
    phase: 'idle'
  }
}

export const Loading: Story = {
  args: {
    phase: 'loading'
  }
}

export const Outro: Story = {
  args: {
    phase: 'outro'
  }
}
