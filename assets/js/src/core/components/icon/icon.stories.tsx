/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type Meta } from '@storybook/react'
import { Icon } from './icon'
import { theme } from 'antd'

const config: Meta = {
  title: 'Components/General/Icon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },

  argTypes: {
    value: {
      options: ['asset', 'folder'],
      control: { type: 'radio' }
    }
  },

  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: 'asset',
    options: { width: 16, height: 16 }
  }
}
