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
import { Tag } from '@Pimcore/components/tag/tag'
import React from 'react'
import { Badge } from '@Pimcore/components/badge/badge'

const config: Meta = {
  title: 'Components/General/Tag',
  component: Tag,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    color: 'default',
    children: 'default'
  }
}

export const ColorSuccessIconTag = {
  args: {
    iconName: 'published',
    color: 'success',
    children: 'Published'
  }
}

export const ColorBlueIconTag = {
  args: {
    iconName: 'user',
    color: 'blue',
    children: 'Own draft'
  }
}

export const ThemeTransparent = {
  args: {
    theme: 'transparent',
    children: 'ID: 150',
    wrapperStyle: {
      backgroundColor: 'rgba(215, 199, 236, 0.4)',
      padding: '10px',
      borderRadius: '4px'
    }
  },
  render: (args) => (
    <div style={ args.wrapperStyle }>
      <Tag { ...args } />
    </div>
  )
}

export const DefaultIconTag = {
  args: {
    color: 'default',
    iconName: 'shield',
    children: 'Jane Doe'
  }
}

export const ColorBlueNotBordered = {
  args: {
    bordered: false,
    color: 'blue',
    children: 'Car Images/Jaguar'
  }
}

export const ColorProcessingNotBordered = {
  args: {
    bordered: false,
    color: 'processing',
    children: 'Car Images/BMW'
  }
}

export const TagWithBadge = {
  args: {
    children: 'Review License',
    icon: <Badge
      color={ 'lime' }
          />
  }
}
