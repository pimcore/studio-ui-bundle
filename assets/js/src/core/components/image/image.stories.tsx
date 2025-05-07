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
import { Image } from './image'

const config: Meta = {
  title: 'Components/Data Display/Image',
  component: Image,
  args: {
    width: 300,
    height: 300,
    src: ''
  }
}

export default config

export const _default = {}

export const WithPreview = {
  args: {
    preview: {
      src: ''
    }
  }
}
