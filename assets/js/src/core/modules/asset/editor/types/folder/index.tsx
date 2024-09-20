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
import { ListContainer } from './tab-manager/tabs/list/list-container'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
import { PreviewContainer as PreviewColumn } from './tab-manager/tabs/list/grid-columns/preview/preview-container'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import { LinkContainer } from './tab-manager/tabs/list/grid-columns/link/link-container'
import { AssetActions } from './tab-manager/tabs/list/grid-columns/asset-actions/asset-actions'
import {
  TAB_DEPENDENCIES,
  TAB_NOTES_AND_EVENTS,
  TAB_TAGS,
  TAB_WORKFLOW
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tab-definitions'
import {
  TAB_PROPERTIES
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const folderEditorTabManager = container.get<FolderTabManager>(serviceIds['Asset/Editor/FolderTabManager'])

    folderEditorTabManager.register({
      children: <PreviewContainer />,
      icon: <Icon name={ 'image-05' } />,
      key: 'preview',
      label: 'folder.folder-editor-tabs.preview'
    })

    folderEditorTabManager.register({
      children: <ListContainer />,
      icon: <Icon name={ 'unordered-list-outlined' } />,
      key: 'list',
      label: 'folder.folder-editor-tabs.view'
    })

    folderEditorTabManager.register(TAB_PROPERTIES)
    folderEditorTabManager.register(TAB_DEPENDENCIES)
    folderEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    folderEditorTabManager.register(TAB_TAGS)
    folderEditorTabManager.register(TAB_WORKFLOW)

    const gridTypeRegistry = container.get<TypeRegistry>(serviceIds['Grid/TypeRegistry'])

    gridTypeRegistry.registerType({
      component: PreviewColumn,
      type: 'asset-preview'
    })

    gridTypeRegistry.registerType({
      component: LinkContainer,
      type: 'asset-link'
    })

    gridTypeRegistry.registerType({
      component: AssetActions,
      type: 'asset-actions'
    })
  }
})
