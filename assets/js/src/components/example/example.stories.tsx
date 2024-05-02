/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*/

import { type Meta } from '@storybook/react'
import { Example as ExampleComponent } from './example'

const config: Meta = {
  title: 'Pimcore studio/UI/Example',
  component: ExampleComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: 'Save',
    prefix: 'Unsaved changes!! '
  }
}
