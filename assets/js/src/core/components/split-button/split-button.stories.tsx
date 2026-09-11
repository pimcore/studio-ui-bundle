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
import { SplitButton } from './split-button'

const config: Meta = {
  title: 'Components/Controls/Buttons/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    icon: { value: 'new-row' },
    children: 'New row',
    menu: {
      items: [
        { key: 'above', label: 'Insert row above' },
        { key: 'below', label: 'Insert row below' }
      ]
    }
  }
}

export const MenuDisabled = {
  args: {
    ..._default.args,
    menuDisabled: true
  }
}

export const Disabled = {
  args: {
    ..._default.args,
    disabled: true
  }
}
