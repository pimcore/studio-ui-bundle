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
import { type DocumentTabManager } from './tab-manager/document-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TAB_CUSTOM_METADATA, TAB_VERSIONS } from '@Pimcore/modules/asset/editor/shared-tab-manager/tab-definitions'
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
    const documentTabManager = container.get<DocumentTabManager>(serviceIds['Asset/Editor/DocumentTabManager'])

    documentTabManager.register({
      key: 'view',
      label: 'asset.asset-editor-tabs.view',
      children: <PreviewContainer />,
      icon: <Icon value={ 'view' } />
    })

    documentTabManager.register(TAB_CUSTOM_METADATA)
    documentTabManager.register(TAB_PROPERTIES)
    documentTabManager.register(TAB_VERSIONS)
    documentTabManager.register(TAB_SCHEDULE)
    documentTabManager.register(TAB_DEPENDENCIES)
    documentTabManager.register(TAB_NOTES_AND_EVENTS)
    documentTabManager.register(TAB_TAGS)
    documentTabManager.register(TAB_WORKFLOW)
  }
})
