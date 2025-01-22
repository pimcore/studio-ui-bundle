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

import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { type TextTabManager } from './tab-manager/text-tab-manager'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { TAB_CUSTOM_METADATA, TAB_VERSIONS } from '@Pimcore/modules/asset/editor/shared-tab-manager/tab-definitions'
import { EditContainer } from '@Pimcore/modules/asset/editor/types/text/tab-manager/tabs/edit/edit-container'
import {
  TAB_DEPENDENCIES,
  TAB_NOTES_AND_EVENTS,
  TAB_PROPERTIES,
  TAB_SCHEDULE,
  TAB_TAGS,
  TAB_WORKFLOW
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const textTabManager = container.get<TextTabManager>(serviceIds['Asset/Editor/TextTabManager'])

    textTabManager.register({
      key: 'edit',
      label: 'asset.asset-editor-tabs.edit',
      children: <EditContainer />,
      icon: <Icon value={ 'edit-pen' } />
    })

    textTabManager.register(TAB_CUSTOM_METADATA)
    textTabManager.register(TAB_PROPERTIES)
    textTabManager.register(TAB_VERSIONS)
    textTabManager.register(TAB_SCHEDULE)
    textTabManager.register(TAB_DEPENDENCIES)
    textTabManager.register(TAB_NOTES_AND_EVENTS)
    textTabManager.register(TAB_TAGS)
    textTabManager.register(TAB_WORKFLOW)
  }
})
