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
import { Text } from './text'

const config: Meta = {
  title: 'Components/General/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    children: 'Simple text component'
  }
}

export const Strong = {
  args: {
    children: 'Simple text component',
    strong: true
  }
}

export const Secondary = {
  args: {
    children: 'Simple text component',
    type: 'secondary'
  }
}
