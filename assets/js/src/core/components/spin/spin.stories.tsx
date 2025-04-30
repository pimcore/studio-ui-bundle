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
import { Spin } from './spin'

const config: Meta = {
  title: 'Components/Feedback/Spin',
  component: Spin
}

export default config

export const _default = {
}

export const Classic = {
  args: {
    type: 'classic'
  }
}

export const AsContainer = {
  args: {
    asContainer: true
  }
}
