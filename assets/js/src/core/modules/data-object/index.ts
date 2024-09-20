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

import '@Pimcore/modules/data-object/editor'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import type { ComponentRegistry } from '@Pimcore/modules/element/editor/services/component-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { EditorContainer } from '@Pimcore/modules/data-object/editor/editor-container'
import { TitleContainer } from '@Pimcore/modules/data-object/editor/title/title-container'
import { ObjectContainer } from '@Pimcore/modules/data-object/editor/types/object/object-container'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistryService = container.get<ComponentRegistry>(serviceIds['DataObject/Editor/ComponentRegistry'])

    componentRegistryService.registerComponent({
      name: 'object',
      component: ObjectContainer
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'data-object-editor',
      component: EditorContainer,
      titleComponent: TitleContainer
    })

    /* const componentRegistry = container.get<GlobalComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

        componentRegistry.register({
            name: 'editorToolbarContextMenu',
            component: EditorToolbarContextMenu
        }) */
  }
})
