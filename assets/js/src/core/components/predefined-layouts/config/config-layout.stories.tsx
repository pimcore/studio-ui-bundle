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
import { ConfigLayout } from './config-layout'
import { Content } from '../../content/content'
import { TreeElement } from '../../tree-element/tree-element'
import { Icon } from '../../icon/icon'

const config: Meta = {
  title: 'Components/Layout/Predefined/ConfigLayout',
  component: ConfigLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A predefined layout component specifically designed for configuration interfaces. This layout provides a standardized 25/75 split with a left panel for configuration navigation (tree, menu, or options) and a right panel for the main configuration content. Use this component exclusively for configuration screens to maintain consistency across all configuration interfaces in the application.'
      }
    }
  },
  tags: ['autodocs']
}

export default config

const ConfigTree = (): React.JSX.Element => (
  <Content padded>
    <TreeElement
      onSelected={ (key) => {
        console.log('selected:', key)
      } }
      treeData={ [
        {
          title: 'User 1',
          key: '0-0',
          icon: <Icon value={ 'user' } />
        },
        {
          title: 'User 2',
          key: '0-1',
          icon: <Icon value={ 'user' } />
        },
        {
          title: 'grouped users',
          key: '0-1-1',
          icon: <Icon value={ 'folder' } />,
          children: [
            {
              title: 'User 3',
              key: '0-1-1-0',
              icon: <Icon value={ 'user' } />
            },
            {
              title: 'User 4',
              key: '0-1-1-1',
              icon: <Icon value={ 'user' } />
            }
          ]
        }
      ] }
    />
  </Content>

)

export const _default = {
  args: {
    leftItem: {
      children: <ConfigTree />
    },
    rightItem: {
      children: <Content
        none
        noneOptions={ { text: 'Select a user from the tree' } }
        padded
                />
    }
  }
}
