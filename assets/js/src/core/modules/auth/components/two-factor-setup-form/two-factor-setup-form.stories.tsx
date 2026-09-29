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
import { TwoFactorSetupForm } from './two-factor-setup-form'

const config: Meta = {
  title: 'Components/__Refactor/Two factor setup form',
  component: TwoFactorSetupForm,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const secret = 'JBSWY3DPEHPK3PXP'

export const _default = {
  args: {
    loadSetup: async () => ({
      secret,
      otpauthUri: `otpauth://totp/Pimcore:admin?secret=${secret}&issuer=Pimcore`
    }),
    onConfirm: async () => { await new Promise((resolve) => setTimeout(resolve, 1000)) },
    onGetBack: () => {}
  }
}

export const LoadError = {
  args: {
    loadSetup: async () => { throw new Error('Setup not available') },
    onConfirm: async () => {},
    onGetBack: () => {}
  }
}
