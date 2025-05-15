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
import { AssetTarget } from './asset-target'

const config: Meta = {
  title: 'Components/Data Display/AssetTarget',
  component: AssetTarget,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    width: 300,
    height: 300,
    title: 'Place an image here',
    dndIcon: true,
    uploadIcon: true
  }
}
