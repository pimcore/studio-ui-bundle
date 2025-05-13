/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type StoryObj, type Meta } from '@storybook/react'
import { KeyValueList, type KeyValueListProps } from './key-value-list'

const config: Meta = {
  title: 'Components/Data Display/KeyValueList',
  component: KeyValueList,
  parameters: {
    layout: 'fullscreen'

  },
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<KeyValueListProps> = {
  args: {
    items: [
      { key: 'Key 1', value: 'Value 1' },
      { key: 'Key 2', value: 'Value 2' },
      { key: 'Key 3', value: 'Value 3' }
    ]
  }
}
