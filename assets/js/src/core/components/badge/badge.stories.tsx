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
import { Badge } from './badge'
import { Icon } from '@Pimcore/components/icon/icon'

const config: Meta = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  args: {
    children: (
      <Icon value={ 'folder' } />
    ),
    count: 8
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

export const Standalone = {
  args: {
    children: null,
    showZero: true
  }
}

export const WithOverflowCount = {
  args: {
    overflowCount: 5
  }
}

export const WithOffset = {
  args: {
    offset: [7, 0]
  }
}
