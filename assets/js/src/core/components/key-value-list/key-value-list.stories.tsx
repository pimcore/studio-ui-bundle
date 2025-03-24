/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
