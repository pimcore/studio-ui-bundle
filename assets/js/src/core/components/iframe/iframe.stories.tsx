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
import { Iframe } from './iframe'

const meta: Meta<typeof Iframe> = {
  title: 'Components/Others/Iframe',
  component: Iframe,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The iframe is always 100% width and height of the parent container and shows a loading indicator while loading.'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Iframe>

export const Default: Story = {
  args: {
    src: 'https://example.com',
    title: 'Example Iframe'
  }
}
