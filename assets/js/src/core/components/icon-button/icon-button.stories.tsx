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
import { IconButton } from './icon-button'

const config: Meta = {
  title: 'Components/Controls/Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    icon: { value: 'trash' },
    loading: false
  }
}

export const Secondary = {
  args: {
    ..._default.args,
    theme: 'secondary'
  }
}

export const Primary = {
  args: {
    ..._default.args,
    type: 'primary'
  }
}

export const Outlined = {
  args: {
    ..._default.args,
    type: 'default'
  }
}
