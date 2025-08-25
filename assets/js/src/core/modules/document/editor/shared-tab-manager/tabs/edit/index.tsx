/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type DocumentEditorSidebarManager } from './sidebar/sidebar-manager'
import { Icon } from '@Pimcore/components/icon/icon'
import React from 'react'
import {
  HelloWorldContainer
} from './sidebar/tabs/hello-world/hello-world-container'
import {
  ContentSettingsSidebar
} from './sidebar/tabs/content-settings/content-settings-sidebar'
import {
  AreablockTypesSidebar
} from './sidebar/tabs/areablock-types/areablock-types-sidebar'
import { checkAreablockTypesVisibility } from './sidebar/visibility/areablock-types-visibility'

moduleSystem.registerModule({
  onInit: () => {
    const sidebarManager = container.get<DocumentEditorSidebarManager>(serviceIds['Document/Editor/Edit/SidebarManager'])
    
    sidebarManager.registerEntry({
      key: 'areablock-types',
      icon: <Icon
        value={ 'new' }
            />,
      component: <AreablockTypesSidebar />,
      tooltip: 'add-areas',
      isVisible: checkAreablockTypesVisibility
    })

    sidebarManager.registerEntry({
      key: 'content-settings',
      icon: <Icon
        value={ 'content-settings' }
            />,
      component: <ContentSettingsSidebar />,
      tooltip: 'content-settings'
    })
  }
})
