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
import { FolderTabManager } from '@Pimcore/modules/asset/editor/folder/tab-manager/folder-tab-manager'
import { ComponentRegistryService } from '@Pimcore/modules/asset/editor/services/component-registry'
import { IconLibrary } from '@Pimcore/modules/icon-library/services/icon-library'
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { ImageTabManager } from '@Pimcore/modules/asset/editor/image/tab-manager/image-tab-manager'

export const serviceIds = {
  // Widget manager
  widgetManager: 'WidgetManagerService',

  // Assets
  'Asset/Editor/ComponentRegistry': 'Asset/Editor/ComponentRegistry',
  'Asset/Editor/FolderTabManager': 'Asset/Editor/FolderTabManager',
  'Asset/Editor/ImageTabManager': 'Asset/Editor/ImageTabManager',

  // icon library
  iconLibrary: 'IconLibrary'
}

// Widget manager
container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()

// Assets
container.bind(serviceIds['Asset/Editor/ComponentRegistry']).to(ComponentRegistryService).inSingletonScope()
container.bind(serviceIds['Asset/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
container.bind(serviceIds['Asset/Editor/ImageTabManager']).to(ImageTabManager).inSingletonScope()

// Icon library
container.bind(serviceIds.iconLibrary).to(IconLibrary).inSingletonScope()
