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

import { type Meta } from '@storybook/react'
import { SkeletonAvatar } from './skeleton-avatar'

const config: Meta = {
  title: 'Components/General/Skeleton/SkeletonAvatar',
  component: SkeletonAvatar,
  args: {
    active: true
  }
}

export const _default = {}

export const Large = {
  args: {
    size: 'large'
  }
}

export const WithSquareShape = {
  args: {
    shape: 'square'
  }
}

export default config
