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
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TitleContainer } from './title/title-container'
import { type ComponentRegistry } from '@Pimcore/modules/data-object/services/component-registry'
import { ObjectContainer } from '@Pimcore/modules/data-object/editor/types/object/object-container'
import { FolderContainer } from '@Pimcore/modules/data-object/editor/types/folder/folder-container'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistryService = container.get<ComponentRegistry>(serviceIds['DataObject/Editor/ComponentRegistry'])

    componentRegistryService.registerComponent({
      name: 'object',
      component: ObjectContainer
    })

    componentRegistryService.registerComponent({
      name: 'folder',
      component: FolderContainer
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'data-object-editor',
      component: EditorContainer,
      titleComponent: TitleContainer
    })
  }
})
