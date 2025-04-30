/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import { Alert } from './alert'

const config: Meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['autodocs']
}

export const _default = {
  args: {
    description: 'Error Description',
    showIcon: true
  }
}

export const Success = {
  args: {
    ..._default.args,
    type: 'success'
  }
}

export const WithError = {
  args: {
    ..._default.args,
    type: 'error'
  }
}

export const WithWarning = {
  args: {
    ..._default.args,
    type: 'warning'
  }
}

export const Closable = {
  args: {
    ..._default.args,
    type: 'info',
    closable: true
  }
}

export const Banner = {
  args: {
    ..._default.args,
    type: 'info',
    banner: true
  }
}

export const ClosableBanner = {
  args: {
    ..._default.args,
    type: 'info',
    banner: true,
    closable: true
  }
}

export default config
