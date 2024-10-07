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

import { container } from '@Pimcore/app/depency-injection'
import { EditorContainer } from './editor-container'
import '@Pimcore/modules/data-object/editor/types/object'
import '@Pimcore/modules/data-object/editor/types/folder'
import '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties'
import '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule'
import '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TitleContainer } from './title/title-container'
import { ObjectContainer } from '@Pimcore/modules/data-object/editor/types/object/object-container'
import { FolderContainer } from '@Pimcore/modules/data-object/editor/types/folder/folder-container'
import type {
  ComponentRegistry as GlobalComponentRegistry, ComponentRegistryInterface
} from '@Pimcore/modules/app/component-registry/component-registry'
import { EditorToolbarContextMenu } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/context-menu'
import type { TabNode } from 'flexlayout-react'
import type { EditorContainerProps } from '@Pimcore/modules/asset/editor/editor-container'
import { store } from '@Pimcore/app/store'
import { selectDataObjectById } from '@Pimcore/modules/data-object/data-object-draft-slice'

moduleSystem.registerModule({
  onInit: () => {
    const typeComponentRegistry = container.get<ComponentRegistryInterface>(serviceIds['DataObject/Editor/TypeComponentRegistry'])

    typeComponentRegistry.register({
      name: 'object',
      component: ObjectContainer
    })

    typeComponentRegistry.register({
      name: 'folder',
      component: FolderContainer
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'data-object-editor',
      component: EditorContainer,
      titleComponent: TitleContainer,
      isModified: (tabNode: TabNode) => {
        const config = tabNode.getConfig() as EditorContainerProps
        const dataObject = selectDataObjectById(store.getState(), config.id)
        return dataObject?.modified ?? false
      }
    })

    const componentRegistry = container.get<GlobalComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: 'editorToolbarContextMenuDataObject',
      component: EditorToolbarContextMenu
    })
  }
})
