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
import { InlineTextfield as InlineTextfieldComponent } from './inline-textfield'

// @todo check if only applicable to pager
const config: Meta = {
  title: 'Components/__refactor__/Pagination/InlineTextfield',
  component: InlineTextfieldComponent,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    value: '2',
    showDotsValues: ['1', '2', '3', '9', '10'],
    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        e.target.value = ''
        e.target.blur()
      }
      console.log(e.key)
    }
  }
}
