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
import { SkeletonButton } from './skeleton-button'

const config: Meta = {
  title: 'Components/General/Skeleton/SkeletonButton',
  component: SkeletonButton,
  args: {
    active: true
  }
}

export const _default = {}

export const Round = {
  args: {
    shape: 'round'
  }
}

export const Small = {
  args: {
    size: 'small'
  }
}

export default config
