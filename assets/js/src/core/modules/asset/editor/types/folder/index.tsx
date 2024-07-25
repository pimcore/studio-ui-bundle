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
import {
  PropertiesContainer
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/properties/properties-container'
import { AssetActions } from './tab-manager/tabs/list/grid-columns/asset-actions/asset-actions'
import { TagsTabContainer } from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/tags/tags-container'

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

    folderEditorTabManager.register({
      key: 'properties',
      label: 'asset.asset-editor-tabs.properties.text',
      children: <PropertiesContainer />,
      icon: <Icon name={ 'settings2' } />,
      isDetachable: true
    })

    folderEditorTabManager.register({
      key: 'tags',
      label: 'asset.asset-editor-tabs.tag',
      children: <TagsTabContainer />,
      icon: <Icon name={ 'tag-two-tone' } />,
      isDetachable: true
    })

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
