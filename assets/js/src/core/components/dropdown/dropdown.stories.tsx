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

import { type Meta } from '@storybook/react'
import React from 'react'
import { Dropdown, DropdownProps } from './dropdown'
import { DropdownButton } from '../dropdown-button/dropdown-button'
import { Icon } from '../icon/icon'
import { Button } from '../button/button'
import { Content } from '../content/content'
import { Header } from '../header/header'

const config: Meta = {
  title: 'Components/Controls/Dropdowns/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default config

const demoData: DropdownProps = {
  children: <DropdownButton>Hover</DropdownButton>,
  
  menu: {
    selectable: true,
    multiple: true,
    items: [
      {
        key: '1.0',
        label: 'Item 1.0',
        type: 'group',
        children: [
          {
            key: '1.0.0',
            label: 'Item 1.0.0',
            icon: <Icon name="trash" />,
            selectable: false,
            onClick: () => {
              console.log('Item 1.0.0 clicked')
            }
          },
          {
            key: '1.0.1',
            label: 'Item 1.0.1',
            onClick: () => {
              console.log('Item 1.0.1 clicked')
            }
          }
        ]
      },
      
      {
        key: '1',
        type: 'divider',
        dashed: true
      },

      {
        key: '1',
        label: 'Item 1',
        selectable: false,
      },

      {
        key: '2',
        label: 'Item 2',
        children: [
          {
            type: 'custom',
            key: '2.3.5',
            component: (
              <Button>Custom Button</Button>
            )
          },

          {
            type: 'divider'
          },

          {
            key: '2.0',
            label: 'Item 2.0',
            onClick: () => {
              console.log('Item 2.0 clicked')
            }
          },

          {
            type: 'divider'
          },

          {
            type: 'custom',
            key: '2.3.4',
            component: (
              <Content padded>
                <Header title='Title' />
                <Button>Custom Button</Button>
              </Content>
              
            )
          },

          {
            type: 'divider'
          },

          {
            key: '2.1',
            label: 'Item 2.1',
            onClick: () => {
              console.log('Item 2.1 clicked')
            }
          },
        ],
        onClick: () => {
          console.log('Item 2 clicked')
        }
      },
    ]
  }
}

export const _default = {
  args: {
    ...demoData
  }
}

