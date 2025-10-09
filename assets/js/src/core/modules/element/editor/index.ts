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
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { DetachedTab } from '@Pimcore/modules/element/editor/detached-tab/detached-tab'
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { PropertiesContainer } from './shared-tab-manager/tabs/properties/properties-container'
import { ScheduleTabContainer } from './shared-tab-manager/tabs/schedule/schedule-container'
import { DependenciesTabContainer } from './shared-tab-manager/tabs/dependencies/dependencies-container'
import { WorkflowTabContainer } from './shared-tab-manager/tabs/workflow/workflow-container'
import { NotesAndEventsTabContainer } from './shared-tab-manager/tabs/notes-and-events/notes-and-events-container'
import { TagsTabContainer } from './shared-tab-manager/tabs/tags/tags-container'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'detachable-tab',
      component: DetachedTab
    })

    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: componentConfig.element.editor.tab.properties.name,
      component: PropertiesContainer
    })

    componentRegistry.register({
      name: componentConfig.element.editor.tab.schedule.name,
      component: ScheduleTabContainer
    })

    componentRegistry.register({
      name: componentConfig.element.editor.tab.dependencies.name,
      component: DependenciesTabContainer
    })

    componentRegistry.register({
      name: componentConfig.element.editor.tab.workflow.name,
      component: WorkflowTabContainer
    })

    componentRegistry.register({
      name: componentConfig.element.editor.tab.notesAndEvents.name,
      component: NotesAndEventsTabContainer
    })

    componentRegistry.register({
      name: componentConfig.element.editor.tab.tags.name,
      component: TagsTabContainer
    })
  }
})
