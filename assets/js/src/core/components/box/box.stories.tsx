/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import type { Meta } from '@storybook/react'
import { Box } from './box'
import { Button } from '../button/button'
import React from 'react'
import { Text } from '../text/text'

const config: Meta = {
  title: 'Components/Layout/Spacing/Box',
  component: Box,
  parameters: {
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    children: (
      <Button type='primary'>
        Button
      </Button>
    ),
    padding: 'none',
    margin: 'none'
  }
}

export const Padding = {
  args: {
    ..._default.args,
    padding: { x: 'small', y: 'medium' },
    style: { background: '#f2f2f2' }
  }
}

export const PaddingAsString = {
  args: {
    ..._default.args,
    padding: 'large',
    style: { background: '#f2f2f2' }
  }
}

export const PaddingX = {
  args: {
    ..._default.args,
    padding: { x: 'large' },
    style: { background: '#f2f2f2' }
  }
}

export const PaddingY = {
  args: {
    ..._default.args,
    padding: { y: 'large' },
    style: { background: '#f2f2f2' }
  }
}

export const DetailedPadding = {
  args: {
    ..._default.args,
    padding: { top: 'mini', right: 'small', bottom: 'medium', left: 'large' },
    style: { background: '#f2f2f2' }
  }
}

export const Margin = {
  args: {
    ..._default.args,
    margin: { x: 'small', y: 'medium' },
    style: { background: '#f2f2f2' }
  },
  render: (args) => (
    <div style={ { border: '1px solid #ccc' } }>
      <Box { ...args } />
    </div>
  )
}

export const MarginAsString = {
  args: {
    ..._default.args,
    margin: 'large',
    style: { background: '#f2f2f2' }
  },
  render: (args) => (
    <div style={ { border: '1px solid #ccc' } }>
      <Box { ...args } />
    </div>
  )
}

export const MarginX = {
  args: {
    ..._default.args,
    margin: { x: 'large' },
    style: { background: '#f2f2f2' }
  },
  render: (args) => (
    <div style={ { border: '1px solid #ccc' } }>
      <Box { ...args } />
    </div>
  )
}

export const MarginY = {
  args: {
    ..._default.args,
    margin: { y: 'large' },
    style: { background: '#f2f2f2' }
  },
  render: (args) => (
    <div style={ { border: '1px solid #ccc' } }>
      <Box { ...args } />
    </div>
  )
}

export const DetailedMargin = {
  args: {
    ..._default.args,
    margin: { top: 'mini', right: 'small', bottom: 'medium', left: 'large' },
    style: { background: '#f2f2f2' }
  },
  render: (args) => (
    <div style={ { border: '1px solid #ccc' } }>
      <Box { ...args } />
    </div>
  )
}

export const Inline = {
  args: {
    children: (
      <Text>
        Some padded text
      </Text>
    ),
    inline: true,
    component: 'span',
    padding: { x: 'small' }
  },

  render: (args) => {
    return (
      <Text>Lorem <Box { ...args } /> ipsum</Text>
    )
  }
}
