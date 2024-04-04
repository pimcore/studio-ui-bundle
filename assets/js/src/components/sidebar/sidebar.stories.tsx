import { type Meta } from '@storybook/react'
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import { AssetEditorSidebarDetailsTab } from '@Pimcore/modules/asset/editor/image/tab-manager/tabs/preview/sidebar/tabs/details/details'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

const config: Meta = {
  title: 'Pimcore studio/UI/Sidebar',
  component: (args) => {
    return (
      <div style={ { display: 'flex', height: '50vh' } }>
        <Sidebar
          buttons={ args.buttons }
          entries={ args.entries }
        />
      </div>
    )
  },
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
        icon: <Icon
          name={ 'view-details' }
          options={ { width: '16px', height: '16px' } }
              />,
        component: <AssetEditorSidebarDetailsTab />
      }
    ],
    buttons: [
      {
        key: 'focal-point',
        icon: <Icon
          name={ 'focal-point' }
          options={ { width: '16px', height: '16px' } }
              />,
        onClick: () => { console.log('focal-point button clicked') }
      }
    ]
  }
}
