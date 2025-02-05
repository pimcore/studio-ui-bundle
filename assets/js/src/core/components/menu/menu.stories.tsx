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
import { Menu, type IMenuProps } from './menu'
import { Icon } from '../icon/icon'

const MOCK_DEFAULT_DATA: IMenuProps = {
  selectable: true,
  multiple: false,
  items: [
    {
      key: 'sub1',
      label: 'Navigation One',
      icon: <Icon value='user' />,
      children: [
        {
          key: 'g1',
          label: 'Item 1',
          type: 'group',
          children: [
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 2' }
          ]
        },
        {
          key: 'g2',
          label: 'Item 2',
          type: 'group',
          children: [
            { key: '3', label: 'Option 3' },
            { key: '4', label: 'Option 4' }
          ]
        }
      ]
    },
    {
      key: 'sub2',
      label: 'Navigation Two',
      icon: <Icon value='user' />,
      children: [
        { key: '5', label: 'Option 5' },
        { key: '6', label: 'Option 6' },
        {
          key: 'sub3',
          label: 'Submenu',
          children: [
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' }
          ]
        }
      ]
    },
    {
      type: 'divider'
    },
    {
      key: 'sub4',
      label: 'Navigation Three',
      icon: <Icon value='user' />,
      children: [
        { key: '9', label: 'Option 9' },
        { key: '10', label: 'Option 10' },
        { key: '11', label: 'Option 11' },
        { key: '12', label: 'Option 12' }
      ]
    },
    {
      key: 'grp',
      label: 'Group',
      type: 'group',
      children: [
        { key: '13', label: 'Option 13' },
        { key: '14', label: 'Option 14' }
      ]
    }
  ]
}

const config: Meta = {
  title: 'Components/Data Display/Menu',
  component: Menu,
  parameters: {
    layout: 'centered'
  },
  args: {
    ...MOCK_DEFAULT_DATA
  }
}

export default config

export const _default = {
  args: {
    theme: 'light'
  }
}

export const WithDarkTheme = {
  args: {
    theme: 'dark'
  }
}

export const Horizontal = {
  args: {
    mode: 'horizontal'
  }
}
