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
import { EditorContainer } from '@Pimcore/modules/asset/editor/editor-container'
import { FolderContainer } from '@Pimcore/modules/asset/editor/types/folder/folder-container'
import { ImageContainer } from '@Pimcore/modules/asset/editor/types/image/image-container'
import { type ComponentRegistry } from '@Pimcore/modules/asset/editor/services/component-registry'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { UnknownContainer } from './types/unknown/unknown-container'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { VideoContainer } from '@Pimcore/modules/asset/editor/types/video/video-container'
import { TextContainer } from '@Pimcore/modules/asset/editor/types/text/text-container'
import { DocumentContainer } from '@Pimcore/modules/asset/editor/types/document/document-container'
import type { TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import {
  VersionIdCell
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/components/table/cells/version-id-cell/version-id-cell'
import {
  ActionsCell
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tabs/schedule/components/table/cells/actions-cell/actions-cell'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistryService = container.get<ComponentRegistry>(serviceIds['Asset/Editor/ComponentRegistry'])

    componentRegistryService.registerComponent({
      name: 'image',
      component: ImageContainer
    })

    componentRegistryService.registerComponent({
      name: 'video',
      component: VideoContainer
    })

    componentRegistryService.registerComponent({
      name: 'document',
      component: DocumentContainer
    })

    componentRegistryService.registerComponent({
      name: 'text',
      component: TextContainer
    })

    componentRegistryService.registerComponent({
      name: 'folder',
      component: FolderContainer
    })

    componentRegistryService.registerComponent({
      name: 'unknown',
      component: UnknownContainer
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'asset-editor',
      component: EditorContainer
    })

    const typeRegistry = container.get<TypeRegistry>(serviceIds['Grid/TypeRegistry'])

    typeRegistry.registerType({
      type: 'version-id-select',
      component: VersionIdCell
    })

    typeRegistry.registerType({
      type: 'schedule-actions-select',
      component: ActionsCell
    })
  }
})
