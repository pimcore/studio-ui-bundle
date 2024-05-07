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
import { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'

export const serviceIds = {
  widgetManager: Symbol('widgetManagerService'),

  // Asset tab managers
  'Asset/Editor/FolderTabManager': Symbol('Asset/Editor/FolderTabManager')
}

container.bind(serviceIds.widgetManager).to(WidgetRegistry).inSingletonScope()

// Asset tab managers
container.bind(serviceIds['Asset/Editor/FolderTabManager']).to(FolderTabManager).inSingletonScope()
