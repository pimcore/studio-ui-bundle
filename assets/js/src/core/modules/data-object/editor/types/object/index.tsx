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

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { DetachedTab } from '@Pimcore/modules/data-object/editor/detached-tab/detached-tab'
import {
  TAB_DEPENDENCIES, TAB_NOTES_AND_EVENTS,
  TAB_PROPERTIES,
  TAB_SCHEDULE, TAB_TAGS, TAB_WORKFLOW
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'
import { type ObjectTabManager } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/object-tab-manager'
import { TAB_VERSIONS } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const objectEditorTabManager = container.get<ObjectTabManager>(serviceIds['DataObject/Editor/ObjectTabManager'])

    objectEditorTabManager.register(TAB_PROPERTIES)
    objectEditorTabManager.register(TAB_VERSIONS)
    objectEditorTabManager.register(TAB_SCHEDULE)
    objectEditorTabManager.register(TAB_DEPENDENCIES)
    objectEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    objectEditorTabManager.register(TAB_TAGS)
    objectEditorTabManager.register(TAB_WORKFLOW)

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'detachable-tab',
      component: DetachedTab
    })
  }
})
