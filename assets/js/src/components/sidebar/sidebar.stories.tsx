import { type Meta } from '@storybook/react'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { AssetEditorSidebarDetailsTab } from '@Pimcore/modules/asset/types/image/sidebar/tabs/details/details'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

const config: Meta = {
  title: 'Pimcore studio/UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    entries: {
      table: {
        disable: true
      }
    }
  }
}

export default config

export const _default = {
  args: {
    entries: [
      {
        key: 'details',
        icon: <Icon name={'view-details'} options={{ width: '16px', height: '16px' }}/>,
        component: <AssetEditorSidebarDetailsTab/>
      }
    ]
  }
}
