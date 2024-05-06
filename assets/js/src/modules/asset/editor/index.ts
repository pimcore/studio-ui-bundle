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
import '@Pimcore/modules/asset/editor/folder'
import { EditorContainer } from '@Pimcore/modules/asset/editor/editor-container'
import { FolderContainer } from '@Pimcore/modules/asset/editor/folder/folder-container'
import { ImageContainer } from '@Pimcore/modules/asset/editor/image/image-container'
import { type ComponentRegistry, serviceName } from '@Pimcore/modules/asset/editor/services/component-registry'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { UnknownContainer } from './unknown/unknown-container'
import { serviceIds } from '@Pimcore/app/config/services'

const componentRegistryService = container.get<ComponentRegistry>(serviceName)

componentRegistryService.registerComponent({
  name: 'image',
  component: ImageContainer
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
