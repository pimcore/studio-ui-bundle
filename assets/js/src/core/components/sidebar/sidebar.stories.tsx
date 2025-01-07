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
import { Sidebar } from '@Pimcore/components/sidebar/sidebar'
import {
  AssetEditorSidebarDetailsView
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'

const config: Meta = {
  title: 'Components/Layout/Sidebar',
  component: (args) => {
    return (
      <div style={ { display: 'flex', height: '50vh' } }>
        <Sidebar
          buttons={ args.buttons }
          entries={ args.entries }
          highlights={ args.highlights }
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
    },
    buttons: {
      table: {
        disable: true
      }
    }
  }
}

export default config

const FocalPointDemoButton = ({ initialActive = false }: { initialActive?: boolean }): React.JSX.Element => {
  const [isActive, setIsActive] = React.useState(initialActive)

  return (
    <div
      aria-label={ 'focal-point' }
      className={ [
        'button',
        isActive ? 'button--highlighted' : ''
      ].join(' ') }
      key={ 'focal-point-demo' }
      onClick={ () => { setIsActive(!isActive) } }
      onKeyDown={ () => { setIsActive(!isActive) } }
      role={ 'button' }
      tabIndex={ 0 }
    >
      <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'focal-point' }
      />
    </div>
  )
}

const demoData = {
  entries: [
    {
      key: 'details',
      icon: <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'details' }
            />,
      component: <AssetEditorSidebarDetailsView
        height={ 185 }
        onClickCustomDownload={ () => {
        } }
        onClickDownloadByFormat={ (format) => {
          console.log(format)
        } }
        width={ 357 }
                 />
    }
  ],
  buttons: [
    {
      key: 'focal-point',
      icon: <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'focal-point' }
            />,
      component: <FocalPointDemoButton />
    }
  ]
}

export const _default = {
  args: {
    ...demoData
  }
}

export const HighlightedEntries = {
  args: {
    ...demoData,
    buttons: [
      {
        key: 'focal-point',
        icon: <Icon
          options={ { width: '16px', height: '16px' } }
          value={ 'focal-point' }
              />,
        component: <FocalPointDemoButton initialActive />
      }
    ],

    highlights: ['details']
  }
}
