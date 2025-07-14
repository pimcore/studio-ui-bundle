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
import { Divider } from './divider'
import { SIZING_VALUES } from '@Pimcore/utils/sizing'

const config: Meta = {
  title: 'Components/Layout/Spacing/Divider',
  component: Divider,
  argTypes: {
    size: {
      control: 'select',
      options: SIZING_VALUES
    }
  }
}

export default config

export const _default = {}

// Generate stories for all size variants
export const None = {
  args: {
    size: 'none'
  }
}

export const Mini = {
  args: {
    size: 'mini'
  }
}

export const ExtraSmall = {
  args: {
    size: 'extra-small'
  }
}

export const Small = {
  args: {
    size: 'small'
  }
}

export const Normal = {
  args: {
    size: 'normal'
  }
}

export const Medium = {
  args: {
    size: 'medium'
  }
}

export const Large = {
  args: {
    size: 'large'
  }
}

export const ExtraLarge = {
  args: {
    size: 'extra-large'
  }
}

export const Maxi = {
  args: {
    size: 'maxi'
  }
}

export const Dashed = {
  args: {
    dashed: true
  }
}

export const Vertical = {
  args: {
    type: 'vertical'
  }
}

export const WithTitle = {
  args: {
    children: 'Title',
    orientation: 'left'
  }
}

export const SmallWithTitle = {
  args: {
    children: 'Small Title',
    orientation: 'left',
    size: 'small'
  }
}
