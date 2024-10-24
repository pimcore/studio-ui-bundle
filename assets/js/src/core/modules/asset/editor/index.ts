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
import '@Pimcore/modules/asset/editor/types/document'
import '@Pimcore/modules/asset/editor/types/folder'
import '@Pimcore/modules/asset/editor/types/image'
import '@Pimcore/modules/asset/editor/types/text'
import '@Pimcore/modules/asset/editor/types/video'
import '@Pimcore/modules/asset/editor/types/audio'
import '@Pimcore/modules/asset/editor/types/archive'
import '@Pimcore/modules/asset/editor/types/unknown'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import {
  type ComponentRegistry as GlobalComponentRegistry
} from '@Pimcore/modules/app/component-registry/component-registry'
import { EditorToolbarContextMenu } from '@Pimcore/modules/asset/editor/toolbar/context-menu/context-menu'
import { AssetEditorWidget } from '@Pimcore/modules/asset/editor/widget'
import { type TypeRegistryInterface } from '@Pimcore/modules/element/editor/services/type-registry'

moduleSystem.registerModule({
  onInit: () => {
    const typeRegistry = container.get<TypeRegistryInterface>(serviceIds['Asset/Editor/TypeRegistry'])

    typeRegistry.register({
      name: 'image',
      tabManagerServiceId: 'Asset/Editor/ImageTabManager'
    })

    typeRegistry.register({
      name: 'video',
      tabManagerServiceId: 'Asset/Editor/VideoTabManager'
    })

    typeRegistry.register({
      name: 'audio',
      tabManagerServiceId: 'Asset/Editor/AudioTabManager'
    })

    typeRegistry.register({
      name: 'document',
      tabManagerServiceId: 'Asset/Editor/DocumentTabManager'
    })

    typeRegistry.register({
      name: 'text',
      tabManagerServiceId: 'Asset/Editor/TextTabManager'
    })

    typeRegistry.register({
      name: 'folder',
      tabManagerServiceId: 'Asset/Editor/FolderTabManager'
    })

    typeRegistry.register({
      name: 'archive',
      tabManagerServiceId: 'Asset/Editor/ArchiveTabManager'
    })

    typeRegistry.register({
      name: 'unknown',
      tabManagerServiceId: 'Asset/Editor/UnknownTabManager'
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget(AssetEditorWidget)

    const componentRegistry = container.get<GlobalComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: 'editorToolbarContextMenuAsset',
      component: EditorToolbarContextMenu
    })
  }
})
