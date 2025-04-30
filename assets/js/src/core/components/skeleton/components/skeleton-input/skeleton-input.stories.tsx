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
import { SkeletonInput } from './skeleton-input'

const config: Meta = {
  title: 'Components/General/Skeleton/SkeletonInput',
  component: SkeletonInput,
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

export const Small = {
  args: {
    size: 'small'
  }
}

export default config
