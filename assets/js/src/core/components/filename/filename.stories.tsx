/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type StoryObj, type Meta } from '@storybook/react'
import { Filename, type FilenameProps } from './filename'

const config: Meta = {
  title: 'Components/Data Display/Filename',
  component: Filename,
  tags: ['autodocs']
}

export default config

export const _default: StoryObj<FilenameProps> = {
  args: {
    value: 'filename.jpg',
    ellipsis: false
  }
}

export const Ellipsis = {
  args: {
    value: 'Lorem-ipsum-dolor-sit-amet-consetetur-sadipscing-elitr-sed-diam-nonumy-eirmod-tempor-invidunt-ut-labore-et-dolore-magna-aliquyam-erat-sed-diam-voluptua.jpg',
    ellipsis: true
  }
}
