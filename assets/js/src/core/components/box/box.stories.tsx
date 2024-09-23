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

export const Margin = {
  args: {
    ..._default.args,
    margin: { x: 'small', y: 'medium' },
    style: { background: '#f2f2f2' }
  }
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
