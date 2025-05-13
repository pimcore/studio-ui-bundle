/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import '@Pimcore/modules/data-object/editor/types/object'
import '@Pimcore/modules/data-object/editor/types/folder'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { DataObjectEditorWidget } from '@Pimcore/modules/data-object/editor/widget'
import { type TypeRegistryInterface } from '@Pimcore/modules/element/editor/services/type-registry'

moduleSystem.registerModule({
  onInit: () => {
    const typeRegistry = container.get<TypeRegistryInterface>(serviceIds['DataObject/Editor/TypeRegistry'])

    typeRegistry.register({
      name: 'object',
      tabManagerServiceId: 'DataObject/Editor/ObjectTabManager'
    })

    typeRegistry.register({
      name: 'folder',
      tabManagerServiceId: 'DataObject/Editor/FolderTabManager'
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget(DataObjectEditorWidget)
  }
})
