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
  tags: ['autodocs']
}

export const Basic = (): JSX.Element => <Skeleton active />

export const WithAvatar = (): JSX.Element => (
  <SkeletonAvatar active />
)

export const WithButton = (): JSX.Element => (
  <SkeletonButton
    active
    size="default"
  />
)

export const WithInput = (): JSX.Element => (
  <SkeletonInput
    active
    size="large"
  />
)

export default config
