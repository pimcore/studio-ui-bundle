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
import { InputPassword } from './input-password'

const config: Meta = {
  title: 'Components/Data Entry/InputPassword',
  component: InputPassword
}

export default config

export const _default = {}

export const Large = {
  args: {
    size: 'large'
  }
}

export const Small = {
  args: {
    size: 'small'
  }
}

export const Filled = {
  args: {
    placeholder: 'Filled',
    variant: 'filled'
  }
}

export const WithError = {
  args: {
    status: 'error'
  }
}
