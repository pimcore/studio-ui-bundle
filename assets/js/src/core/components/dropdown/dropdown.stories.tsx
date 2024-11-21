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
import { Dropdown, type DropdownProps } from './dropdown'
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
    multiple: false,
    items: [
      {
        key: '1.0',
        label: 'Item 1.0',
        type: 'group',
        children: [
          {
            key: '1.0.0',
            label: 'Item 1.0.0',
            icon: <Icon value="trash" />,
            selectable: true,
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
        key: '22.0',
        label: 'Item 1.0',
        children: [
          {
            key: '12.0.0',
            label: 'Item 12.0.0',
            icon: <Icon value="trash" />,
            selectable: true,
            onClick: () => {
              console.log('Item 1.0.0 clicked')
            }
          },
          {
            key: '12.0.1',
            label: 'Item 12.0.1',
            onClick: () => {
              console.log('Item 1.0.1 clicked')
            }
          }
        ]
      },

      {
        key: '1.x',
        type: 'divider',
        dashed: true
      },

      {
        key: '1',
        label: 'Item 1',
        selectable: true
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
            selectable: true,
            onClick: () => {
              console.log('Item 2.1 clicked')
            }
          }
        ],
        onClick: () => {
          console.log('Item 2 clicked')
        }
      }
    ]
  }
}

export const _default = {
  args: {
    ...demoData
  }
}

const SimpleDropdownItems: DropdownProps['menu']['items'] = [
  {
    key: 'simple-1',
    label: 'Item 1',
    onClick: () => {
      console.log('Item 1 clicked')
    }
  },

  {
    key: 'simple-2',
    label: 'Item 2',
    onClick: () => {
      console.log('Item 2 clicked')
    }
  },

  {
    key: 'simple-3',
    label: 'Item 3',
    onClick: () => {
      console.log('Item 3 clicked')
    }
  }
]

export const Simple = {
  args: {
    children: <DropdownButton>Hover</DropdownButton>,
    menu: {
      items: SimpleDropdownItems
    }
  }
}

const SelectableDropdownItems: DropdownProps['menu']['items'] = [
  {
    key: 'selectable-1',
    label: 'Item 1',
    selectable: true,
    onClick: () => {
      console.log('Item 1 clicked')
    }
  },

  {
    key: 'selectable-2',
    label: 'Item 2',
    selectable: true,
    onClick: () => {
      console.log('Item 2 clicked')
    }
  },

  {
    key: 'selectable-3',
    label: 'Item 3',
    selectable: true,
    onClick: () => {
      console.log('Item 3 clicked')
    }
  }
]

export const Selectable = {
  args: {
    children: <DropdownButton>Hover</DropdownButton>,
    menu: {
      selectable: true,
      items: SelectableDropdownItems
    }
  }
}

const MultipleSelectableDropdownItems: DropdownProps['menu']['items'] = [
  {
    key: 'multi-selectable-1',
    label: 'Item 1',
    selectable: true,
    onClick: () => {
      console.log('Item 1 clicked')
    }
  },

  {
    key: 'multi-selectable-2',
    label: 'Item 2',
    selectable: true,
    onClick: () => {
      console.log('Item 2 clicked')
    }
  },

  {
    key: 'multi-selectable-3',
    label: 'Item 3',
    selectable: true,
    onClick: () => {
      console.log('Item 3 clicked')
    }
  }
]

export const MultiSelectable = {
  args: {
    children: <DropdownButton>Hover</DropdownButton>,
    menu: {
      selectable: true,
      multiple: true,
      items: MultipleSelectableDropdownItems
    }
  }
}

const CustomDropdownItems: DropdownProps['menu']['items'] = [
  {
    key: 'custom-1',
    type: 'custom',
    component: (
      <Button>Custom Button 1</Button>
    )
  },

  {
    key: 'custom-2',
    type: 'divider'
  },

  {
    key: 'custom-3',
    type: 'custom',
    component: (
      <Button>Custom Button 3</Button>
    )
  }
]

export const CustomSelectable = {
  args: {
    children: <DropdownButton>Hover</DropdownButton>,
    menu: {
      items: CustomDropdownItems
    }
  }
}

const GroupedDropdownItems: DropdownProps['menu']['items'] = [
  {
    type: 'group',
    key: 'group-1',
    label: 'Group 1',
    children: [
      {
        key: 'grouped-1',
        label: 'Item 1',
        onClick: () => {
          console.log('Item 1 clicked')
        }
      },

      {
        key: 'grouped-2',
        label: 'Item 2',
        onClick: () => {
          console.log('Item 2 clicked')
        }
      },

      {
        key: 'grouped-3',
        label: 'Item 3',
        onClick: () => {
          console.log('Item 3 clicked')
        }
      }
    ]
  }
]

export const Grouped = {
  args: {
    children: <DropdownButton>Hover</DropdownButton>,
    menu: {
      items: GroupedDropdownItems
    }
  }
}

const SubmenuDropdownItems: DropdownProps['menu']['items'] = [
  {
    key: 'submenu-1',
    label: 'Default',
    children: [
      ...SimpleDropdownItems
    ]
  },

  {
    key: 'submenu-2',
    label: 'Selectable',
    children: [
      ...SelectableDropdownItems
    ]
  },

  {
    key: 'submenu-3',
    label: 'Custom',
    children: [
      ...CustomDropdownItems
    ]
  }
]

export const Submenu = {
  args: {
    children: <DropdownButton>Hover</DropdownButton>,
    menu: {
      selectable: true,
      multiple: true,
      items: SubmenuDropdownItems
    }
  }
}

export const ContextMenu = {
  args: {
    children: <Content>Dropdown will behave like a context menu</Content>,
    trigger: ['contextMenu'],
    menu: {
      items: [
        {
          key: 'context-1',
          label: 'Item 1',
          onClick: () => {
            console.log('Item 1 clicked')
          }
        },

        {
          key: 'context-2',
          label: 'Item 2',
          onClick: () => {
            console.log('Item 2 clicked')
          }
        },

        {
          key: 'context-3',
          label: 'Item 3',
          onClick: () => {
            console.log('Item 3 clicked')
          }
        }
      ]
    }
  }
}
