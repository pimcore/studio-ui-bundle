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
import { TwoFactorCodeError } from '../../hooks/use-two-factor-authentication'
import { TwoFactorForm } from './two-factor-form'

const config: Meta = {
  title: 'Components/__Refactor/Two factor form',
  component: TwoFactorForm,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    digits: 6,
    onVerify: async () => { await new Promise((resolve) => setTimeout(resolve, 1000)) },
    onGetBack: () => {}
  }
}

export const InvalidCode = {
  args: {
    digits: 6,
    onVerify: async () => await Promise.reject(new TwoFactorCodeError('invalid-code')),
    onGetBack: () => {}
  }
}
