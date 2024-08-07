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
import { FolderTabManager } from '@Pimcore/modules/asset/editor/types/folder/tab-manager/folder-tab-manager'
import { ComponentRegistryService } from '@Pimcore/modules/asset/editor/services/component-registry'
import { IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { ImageTabManager } from '@Pimcore/modules/asset/editor/types/image/tab-manager/image-tab-manager'
import { TypeRegistry } from '@Pimcore/components/grid/services/type-registry'
import { TextTabManager } from '@Pimcore/modules/asset/editor/types/text/tab-manager/text-tab-manager'
import { DocumentTabManager } from '@Pimcore/modules/asset/editor/types/document/tab-manager/document-tab-manager'
import { VideoTabManager } from '@Pimcore/modules/asset/editor/types/video/tab-manager/video-tab-manager'
import { AudioTabManager } from '@Pimcore/modules/asset/editor/types/audio/tab-manager/audio-tab-manager'
import { UnknownTabManager } from '@Pimcore/modules/asset/editor/types/unknown/tab-manager/unknown-tab-manager'

export const serviceIds = {
  // Widget manager
  widgetManager: 'WidgetManagerService',

  // Assets
  'Asset/Editor/ComponentRegistry': 'Asset/Editor/ComponentRegistry',
  'Asset/Editor/DocumentTabManager': 'Asset/Editor/DocumentTabManager',
  'Asset/Editor/FolderTabManager': 'Asset/Editor/FolderTabManager',
  'Asset/Editor/ImageTabManager': 'Asset/Editor/ImageTabManager',
  'Asset/Editor/TextTabManager': 'Asset/Editor/TextTabManager',
  'Asset/Editor/VideoTabManager': 'Asset/Editor/VideoTabManager',
  'Asset/Editor/AudioTabManager': 'Asset/Editor/AudioTabManager',
  'Asset/Editor/UnknownTabManager': 'Asset/Editor/UnknownTabManager',

  // icon library
  iconLibrary: 'IconLibrary',

  // Grid
  'Grid/TypeRegistry': 'Grid/TypeRegistry'
}

// Widget manager
container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()

// Assets
container.bind(serviceIds['Asset/Editor/ComponentRegistry']).to(ComponentRegistryService).inSingletonScope()

container.bind(serviceIds['Asset/Editor/DocumentTabManager']).to(DocumentTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/ImageTabManager']).to(ImageTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/TextTabManager']).to(TextTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/VideoTabManager']).to(VideoTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/AudioTabManager']).to(AudioTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/UnknownTabManager']).to(UnknownTabManager).inSingletonScope()

// Icon library
container.bind(serviceIds.iconLibrary).to(IconLibrary).inSingletonScope()

// Grid
container.bind(serviceIds['Grid/TypeRegistry']).to(TypeRegistry).inSingletonScope()
