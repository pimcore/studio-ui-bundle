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
import { TagInput } from './tag-input'

const config: Meta<typeof TagInput> = {
  title: 'Components/Data Entry/TagInput',
  component: TagInput
}

export default config

type Story = StoryObj<typeof TagInput>

export const _default: Story = {
  args: {
    placeholder: 'Type and press Enter to add...'
  }
}

export const WithInitialValues: Story = {
  args: {
    value: ['tag-one', 'tag-two', 'tag-three'],
    placeholder: 'Add more tags...'
  }
}
