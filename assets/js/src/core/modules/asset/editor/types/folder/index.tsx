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
import { type FolderTabManager } from './tab-manager/folder-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import {
  TAB_DEPENDENCIES,
  TAB_NOTES_AND_EVENTS,
  TAB_PROPERTIES,
  TAB_TAGS,
  TAB_WORKFLOW
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'
import { TAB_LISTING } from './tab-manager/tabs/listing/listing-container'

moduleSystem.registerModule({
  onInit: () => {
    const folderEditorTabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

    folderEditorTabManager.register({
      children: <PreviewContainer />,
      icon: <Icon value={ 'image' } />,
      key: 'preview',
      label: 'folder.folder-editor-tabs.preview'
    })

    folderEditorTabManager.register(TAB_LISTING)
    folderEditorTabManager.register(TAB_PROPERTIES)
    folderEditorTabManager.register(TAB_DEPENDENCIES)
    folderEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    folderEditorTabManager.register(TAB_TAGS)
    folderEditorTabManager.register(TAB_WORKFLOW)
  }
})
