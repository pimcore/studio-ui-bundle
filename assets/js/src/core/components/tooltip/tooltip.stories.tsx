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
import { Tooltip } from './tooltip'

const config: Meta = {
  title: 'Components/Data Display/Tooltip',
  component: Tooltip,
  args: {
    children: 'Hover me!',
    title: 'This is a tooltip'
  }
}

export default config

export const _default = {}

export const WithCustomPlacement = {
  args: {
    placement: 'bottomLeft'
  }
}

export const Colorful = {
  args: {
    color: 'purple'
  }
}

export const Disabled = {
  args: {
    title: ''
  }
}
