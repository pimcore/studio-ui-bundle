import React from 'react';
import { type Meta } from '@storybook/react'
import { Tree } from '@Pimcore/components/tree/tree'
import { TreeSearch } from './search/tree-search';
import { TreePager } from './pager/tree-pager';

const config: Meta = {
  title: 'Pimcore studio/UI/Tree',
  component: Tree,

  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    )
  ],

  tags: ['autodocs']
}

export default config

const items = [
  { icon: 'camera', label: 'Item', metaData: { id: 1 } },
  {
    icon: 'folder',
    label: 'Item',
    hasChildren: true,
    children: [
      { 
        icon: 'folder',
        label: 'Item',
        hasChildren: true,
        children: [
          { 
            icon: 'camera',
            label: 'Item 1' 
          },
          { 
            icon: 'folder', 
            label: 'Item 11',
            hasChildren: true,
            children: [
              { 
                icon: 'camera',
                label: 'Item 111' 
              },
              { 
                icon: 'folder', 
                label: 'Item 112' 
              }
            ]
          },
          { 
            icon: 'camera',
            label: 'Item 2' 
          },
          { 
            icon: 'folder', 
            label: 'Item 3' 
          },
          { 
            icon: 'camera',
            label: 'Item 4' 
          },
          { 
            icon: 'folder', 
            label: 'Item 5' 
          }
        ]
      }
    ]
  },
  { icon: 'camera', label: 'Item' },
  { icon: 'camera', label: 'Item' },
]

export const _default = {
  args: {
    items,
  }
}

export const Advanced = {
  args: {
    items,
    renderFilter: TreeSearch,
    renderPager: TreePager,
    maxItemsPerNode: 2
  }
}
