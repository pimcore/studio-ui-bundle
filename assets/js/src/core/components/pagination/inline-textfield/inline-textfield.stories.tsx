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
