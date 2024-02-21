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
        icon: <PictureOutlined/>
      },
      {
        key: '2',
        label: 'Tab 2',
        children: 'Tab 2',
        icon: <Icon name={'edit'}/>
      },
      {
        key: '3',
        label: 'Tab 3',
        children: 'Tab 3',
        icon: <Icon name={'view-details'}/>
      },
      {
        key: '4',
        label: 'Tab 4',
        children: 'Tab 4',
        icon: <TagOutlined/>
      }
    ]
  }
}
