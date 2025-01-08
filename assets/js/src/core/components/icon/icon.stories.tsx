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

import { type Meta } from '@storybook/react'
import { Icon } from './icon'

const config: Meta = {
  title: 'Components/General/Icon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },

  argTypes: {
    name: {
      options: ['asset', 'folder'],
      control: { type: 'radio' }
    }
  },

  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    name: 'asset',
    options: { width: 16, height: 16 }
  }
}
