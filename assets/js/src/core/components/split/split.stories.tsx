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
import { Split } from './split'
import React from 'react'
import { Button } from '../button/button'

const config: Meta = {
  title: 'Components/Layout/Spacing/Split',
  component: Split,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <div>Content 2</div>
        <div>Content 3</div>
      </>
    )
  }
}

export const SecondaryTheme = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <div>Content 2</div>
        <div>Content 3</div>
      </>
    ),
    theme: 'secondary'
  }
}

export const LargeDivider = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <div>Content 2</div>
        <div>Content 3</div>
      </>
    ),
    dividerSize: 'large'
  }
}

export const SmallDivider = {
  args: {
    children: (
      <>
        <Button>Button 1</Button>
        <div>Content 2</div>
        <div>Content 3</div>
      </>
    ),
    dividerSize: 'small'
  }
}
