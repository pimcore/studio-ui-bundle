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
import React from 'react'
import { SplitLayout } from './split-layout'
import { Content } from '../content/content'

const config: Meta = {
  title: 'Components/Layout/SplitLayout',
  component: SplitLayout,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    leftItem: {
      id: '1',
      size: 50,
      children: <Content none />
    },
    rightItem: {
      id: '2',
      size: 50,
      children: <Content none />
    }
  }
}

export const LayoutLeft25Right75 = {
  args: {
    leftItem: {
      id: '1',
      size: 25,
      minSize: 200,
      children: <Content none />
    },
    rightItem: {
      id: '2',
      size: 75,
      minSize: 600,
      children: <Content none />
    }
  }
}

export const LayoutLeft25Right75WithDivider = {
  args: {
    withDivider: true,
    leftItem: {
      id: '1',
      size: 25,
      minSize: 200,
      children: <Content none />
    },
    rightItem: {
      id: '2',
      size: 75,
      minSize: 600,
      children: <Content none />
    }
  }
}

export const LayoutLeft25Right75WithDividerAndResizer = {
  args: {
    withDivider: true,
    resizeAble: true,
    leftItem: {
      id: '1',
      size: 25,
      minSize: 200,
      children: <Content none />
    },
    rightItem: {
      id: '2',
      size: 75,
      minSize: 600,
      children: <Content none />
    }
  }
}
