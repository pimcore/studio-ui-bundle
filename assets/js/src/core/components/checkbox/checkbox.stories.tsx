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
import { Checkbox } from './checkbox'

const config: Meta = {
  title: 'Components/Data Entry/Checkbox',
  component: Checkbox
}

export default config

export const _default = {}

export const Checked = {
  args: {
    checked: true
  }
}

export const Disabled = {
  args: {
    checked: true,
    disabled: true
  }
}

export const Indeterminated = {
  args: {
    indeterminate: true
  }
}
