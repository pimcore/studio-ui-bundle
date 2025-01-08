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

import {
  AssetEditorSidebarManager
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/sidebar-manager'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import {
  DetailContainer
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/tabs/details/details-container'
import {
  FocalPointSidebarButton
} from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/preview/sidebar/buttons/focal-point'

export const sidebarManager = new AssetEditorSidebarManager()

sidebarManager.registerEntry({
  key: 'details',
  icon: <Icon
    options={ { width: '16px', height: '16px' } }
    value={ 'details' }
        />,
  component: <DetailContainer />
})

sidebarManager.registerButton({
  key: 'focal-point',
  icon: <Icon
    options={ { width: '16px', height: '16px' } }
    value={ 'focal-point' }
        />,
  component: <FocalPointSidebarButton
    icon={ <Icon
      options={ { width: '16px', height: '16px' } }
      value={ 'focal-point' }
           /> }
    key={ 'focal-point' }
             />
})
