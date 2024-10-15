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
import { SimpleTree } from './simple-tree'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

const config: Meta = {
  title: 'Components/Data Display/Tree',
  component: SimpleTree,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    treeData: [
      {
        title: 'All users',
        key: '0-0',
        actions: [{ key: 'add-folder', icon: 'PlusCircleOutlined' }, { key: 'add-user', icon: 'PlusCircleOutlined' }],
        icon: <Icon name={ 'folder' } />,
        children: [
          {
            title: 'Admins',
            key: '0-0-0',
            actions: [{ key: 'add-folder', icon: 'PlusCircleOutlined' }, { key: 'add-user', icon: 'PlusCircleOutlined' }],
            icon: <Icon name={ 'folder' } />,
            children: [
              {
                title: 'Superuser',
                key: '2',
                type: 'user',
                icon: <Icon name={ 'user-01' } />,
                actions: [{ key: 'clone', icon: 'copy-03' }, { key: 'remove', icon: 'trash' }]
              }
            ]
          },
          {
            title: 'Portal Engine',
            key: '0-0-1',
            actions: [{ key: 'add-folder', icon: 'PlusCircleOutlined' }, { key: 'add-user', icon: 'PlusCircleOutlined' }],
            icon: <Icon name={ 'folder' } />,
            children: [
              {
                title: 'All rights',
                key: '0-0-1-0',
                actions: [{ key: 'add-folder', icon: 'PlusCircleOutlined' }, { key: 'add-user', icon: 'PlusCircleOutlined' }],
                icon: <Icon name={ 'folder' } />,
                children: [
                  {
                    title: 'Jack',
                    key: '0-0-1-0-0',
                    icon: <Icon name={ 'user-01' } />,
                    actions: [{ key: 'clone', icon: 'copy-03' }, { key: 'remove', icon: 'trash' }]
                  },
                  {
                    title: 'John',
                    key: '0-0-1-0-1',
                    icon: <Icon name={ 'user-01' } />,
                    actions: [{ key: 'clone', icon: 'copy-03' }, { key: 'remove', icon: 'trash' }]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    defaultExpandedKeys: ['0-0'],
    onDragAndDrop: ({ node, dragNode, dropPosition }) => {
      console.log('drag:', dragNode, 'drop to:', node, 'at position', dropPosition)
    },
    onSelected: (key) => {
      console.log('selected:', key)
    },
    onActionsClick: (key, type) => {
      switch (type) {
        case 'add-folder':
          console.log('add-folder clicked:', key)
          break
        case 'add':
          console.log('add clicked:', key)
          break
        case 'clone':
          console.log('clone clicked:', key)
          break
        case 'remove':
          console.log('remove clicked:', key)
      }
    }
  }
}

export const Checkable = {
  args: {
    treeData: [
      {
        title: 'All Tags',
        key: '0',
        icon: <Icon name={ 'folder' } />,
        children: [
          {
            title: 'Countries',
            key: '0-0',
            icon: <Icon name={ 'tag-02' } />,
            children: [
              {
                title: 'Australia',
                key: '0-0-0',
                icon: <Icon name={ 'tag-02' } />
              },
              {
                title: 'Mongolia',
                key: '0-0-1',
                icon: <Icon name={ 'tag-02' } />
              },
              {
                title: 'Kenya',
                key: '0-0-2',
                icon: <Icon name={ 'tag-02' } />
              }
            ]
          },
          {
            title: 'Print',
            key: '0-1',
            icon: <Icon name={ 'tag-02' } />,
            children: [
              {
                title: 'A4',
                key: '0-1-0',
                icon: <Icon name={ 'tag-02' } />
              }
            ]
          }
        ]
      }
    ],
    defaultExpandedKeys: ['0'],
    onSelected: (key) => {
      console.log('selected:', key)
    },
    onCheck: (checkedKeys) => {
      console.log('checked:', checkedKeys)
    },
    onDragAndDrop: ({ node, dragNode, dropPosition }) => {
      console.log('drag:', dragNode, 'drop to:', node, 'at position', dropPosition)
    }
  }
}
