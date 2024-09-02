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
import { AssetEditorSidebarDetailsView } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-view'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import {FocalPoint} from "@Pimcore/components/focal-point/focal-point";
import {Button} from "antd";
import {IconButton} from "@Pimcore/components/icon-button/icon-button";

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
    }
  }
}

export default config

const demoData = {
  entries: [
    {
      key: 'details',
      icon: <Icon
        name={ 'view-details' }
        options={ { width: '16px', height: '16px' } }
            />,
      component: <AssetEditorSidebarDetailsView
        height={ 185 }
        onClickCustomDownload={ () => {} }
        onClickDownloadByFormat={ (format) => { console.log(format) } }
        width={ 357 }
                 />
    }
  ],
  buttons: [
    {
      key: 'focal-point',
      icon: <Icon
        name={ 'focal-point' }
        options={ { width: '16px', height: '16px' } }
      />
    }
  ],
}

export const _default = {
  args: {
    ...demoData,
  }
}

export const HighlightedEntries = {
  args: {
    ...demoData,

    highlights: ['details', 'focal-point']
  }
}
