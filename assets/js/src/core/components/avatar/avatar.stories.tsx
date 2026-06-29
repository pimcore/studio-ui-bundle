/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type Meta } from '@storybook/react'
import { Avatar } from './avatar'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  args: {
    icon: <Icon value={ 'user' } />,
    size: 32
  }
}

export default config

export const _default = {}

export const Small = {
  args: {
    size: 'small'
  }
}

export const Large = {
  args: {
    size: 'large'
  }
}

export const Square = {
  args: {
    shape: 'square'
  }
}
