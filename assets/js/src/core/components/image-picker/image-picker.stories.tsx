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
import { ImagePicker } from './image-picker'

const config: Meta = {
  title: 'Components/Data Entry/ImagePicker',
  component: ImagePicker
}

export default config

export const _default = {
  args: {
    type: 'add',
    value: null,
    onChange: (value: unknown) => { console.log('image-picker change', value) }
  }
}

export const WithValue = {
  args: {
    ..._default.args,
    value: {
      type: 'asset',
      id: 1,
      fullPath: '/examples/sample-image.jpg'
    }
  }
}

export const Disabled = {
  args: {
    ..._default.args,
    disabled: true
  }
}
