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

import { EditorTabs } from '@Pimcore/components/editor-tabs/editor-tabs'
import { type Meta } from '@storybook/react'
import { PictureOutlined, TagOutlined } from '@ant-design/icons'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

const config: Meta = {
  title: 'Pimcore studio/UI/Editor Tabs',
  component: EditorTabs,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  },
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    defaultActiveKey: '2',
    showLabelIfActive: false,
    items: [
      {
        key: '1',
        label: 'Tab 1',
        children: 'Tab 1',
        icon: <PictureOutlined />
      },
      {
        key: '2',
        label: 'Tab 2',
        children: 'Tab 2',
        icon: <Icon name={ 'edit' } />,
        isDetachable: true
      },
      {
        key: '3',
        label: 'Tab 3',
        children: 'Tab 3',
        icon: <Icon name={ 'view-details' } />
      },
      {
        key: '4',
        label: 'Tab 4',
        children: 'Tab 4',
        icon: <TagOutlined />
      }
    ]
  }
}
