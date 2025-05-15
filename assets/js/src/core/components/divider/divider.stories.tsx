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
import { Divider } from './divider'

const config: Meta = {
  title: 'Components/Layout/Spacing/Divider',
  component: Divider
}

export default config

export const _default = {}

export const Dashed = {
  args: {
    dashed: true
  }
}

export const Vertical = {
  args: {
    type: 'vertical'
  }
}

export const WithTitle = {
  args: {
    children: 'Title',
    orientation: 'left'
  }
}
