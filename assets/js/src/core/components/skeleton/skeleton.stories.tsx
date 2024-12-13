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

import React from 'react'
import { type Meta } from '@storybook/react'
import Skeleton from './skeleton'
import SkeletonAvatar from './components/skeleton-avatar'
import SkeletonButton from './components/skeleton-button'
import SkeletonInput from './components/skeleton-input'

const config: Meta = {
  title: 'Components/General/Skeleton',
  component: Skeleton,
  args: {
    active: true
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: 'code'
      }
    }
  }
}

export const _default = {}

export const WithAvatar = (): JSX.Element => (
  <SkeletonAvatar />
)

export const WithButton = (): JSX.Element => (
  <SkeletonButton />
)

export const WithInput = (): JSX.Element => (
  <SkeletonInput />
)

export default config
