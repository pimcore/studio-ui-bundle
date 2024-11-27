/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
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
