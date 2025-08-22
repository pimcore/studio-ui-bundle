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
  AreablockTypesContainer
} from './sidebar/tabs/areablock-types/areablock-types-container'
import { checkAreablockTypesVisibility } from './sidebar/visibility/areablock-types-visibility'

moduleSystem.registerModule({
  onInit: () => {
    const sidebarManager = container.get<DocumentEditorSidebarManager>(serviceIds['Document/Editor/Edit/SidebarManager'])

    sidebarManager.registerEntry({
      key: 'hello-world',
      icon: <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'edit' }
            />,
      component: <HelloWorldContainer />,
      tooltip: 'Hello World'
    })

    sidebarManager.registerEntry({
      key: 'areablock-types',
      icon: <Icon
        options={ { width: '16px', height: '16px' } }
        value={ 'collection' }
            />,
      component: <AreablockTypesContainer />,
      tooltip: 'Areablock Types',
      isVisible: checkAreablockTypesVisibility
    })
  }
})
