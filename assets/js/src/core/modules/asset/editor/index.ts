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
import '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/custom-metadata'
import '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/versions'
import '@Pimcore/modules/element/editor/shared-tab-manager/tabs/properties'
import '@Pimcore/modules/element/editor/shared-tab-manager/tabs/schedule'
import '@Pimcore/modules/element/editor/shared-tab-manager/tabs/dependencies'
import { EditorContainer } from '@Pimcore/modules/asset/editor/editor-container'
import { FolderContainer } from '@Pimcore/modules/asset/editor/types/folder/folder-container'
import { ImageContainer } from '@Pimcore/modules/asset/editor/types/image/image-container'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { VideoContainer } from '@Pimcore/modules/asset/editor/types/video/video-container'
import { TextContainer } from '@Pimcore/modules/asset/editor/types/text/text-container'
import { DocumentContainer } from '@Pimcore/modules/asset/editor/types/document/document-container'
import { TitleContainer } from './title/title-container'
import { AudioContainer } from '@Pimcore/modules/asset/editor/types/audio/audio-container'
import { UnknownContainer } from '@Pimcore/modules/asset/editor/types/unknown/unknown-container'
import { ArchiveContainer } from '@Pimcore/modules/asset/editor/types/archive/archive-container'
import {
  type ComponentRegistry as GlobalComponentRegistry, type ComponentRegistryInterface
} from '@Pimcore/modules/app/component-registry/component-registry'
import { EditorToolbarContextMenu } from '@Pimcore/modules/asset/editor/toolbar/context-menu/context-menu'

moduleSystem.registerModule({
  onInit: () => {
    const typeComponentRegistry = container.get<ComponentRegistryInterface>(serviceIds['Asset/Editor/TypeComponentRegistry'])

    typeComponentRegistry.register({
      name: 'image',
      component: ImageContainer
    })

    typeComponentRegistry.register({
      name: 'video',
      component: VideoContainer
    })

    typeComponentRegistry.register({
      name: 'audio',
      component: AudioContainer
    })

    typeComponentRegistry.register({
      name: 'document',
      component: DocumentContainer
    })

    typeComponentRegistry.register({
      name: 'text',
      component: TextContainer
    })

    typeComponentRegistry.register({
      name: 'folder',
      component: FolderContainer
    })

    typeComponentRegistry.register({
      name: 'archive',
      component: ArchiveContainer
    })

    typeComponentRegistry.register({
      name: 'unknown',
      component: UnknownContainer
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'asset-editor',
      component: EditorContainer,
      titleComponent: TitleContainer
    })

    const componentRegistry = container.get<GlobalComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: 'editorToolbarContextMenuAsset',
      component: EditorToolbarContextMenu
    })
  }
})
