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
import '@Pimcore/modules/data-object/editor/types/variant'
import '@Pimcore/modules/data-object/editor/types/folder'
import '@Pimcore/modules/data-object/editor/toolbar/context-menu'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { DataObjectEditorWidget } from '@Pimcore/modules/data-object/editor/widget'
import { type TypeRegistryInterface } from '@Pimcore/modules/element/editor/services/type-registry'
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { EditorToolbarContextMenu } from '@Pimcore/modules/data-object/editor/toolbar/context-menu/context-menu'
import { ConditionalLanguageSelection } from '@Pimcore/modules/data-object/editor/toolbar/language-selection/conditional-language-selection'
import { LanguageComparisonViewButton } from './toolbar/language-comparison-view/language-comparison-view-button'
import { EditorToolbarWorkflowMenu } from '@Pimcore/modules/element/editor/shared-components/workflow/menu/workflow-menu'
import { EditorToolbarSaveButtons as DataObjectEditorToolbarSaveButtons } from '@Pimcore/modules/data-object/editor/toolbar/save-buttons/save-buttons'
import { PreviewView } from './shared-tab-manager/tabs/preview/preview-view'
import { VersionViewContainer } from './shared-tab-manager/tabs/versions/version-view-container'
import { ListingContainer } from './types/folder/tab-manager/tabs/listing/listing-container'
import { EditContainer } from './types/object/tab-manager/tabs/edit/edit-container'
import { VariantsTabContainer } from './types/variant/tab-manager/tabs/variants/variants-tab-container'

moduleSystem.registerModule({
  onInit: () => {
    const typeRegistry = container.get<TypeRegistryInterface>(serviceIds['DataObject/Editor/TypeRegistry'])

    typeRegistry.register({
      name: 'object',
      tabManagerServiceId: 'DataObject/Editor/ObjectTabManager'
    })

    typeRegistry.register({
      name: 'variant',
      tabManagerServiceId: 'DataObject/Editor/VariantTabManager'
    })

    typeRegistry.register({
      name: 'folder',
      tabManagerServiceId: 'DataObject/Editor/FolderTabManager'
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget(DataObjectEditorWidget)

    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.registerToSlot('dataObject.editor.toolbar.slots.left', {
      name: 'contextMenu',
      priority: 100,
      component: EditorToolbarContextMenu
    })

    componentRegistry.registerToSlot('dataObject.editor.toolbar.slots.left', {
      name: 'languageSelection',
      priority: 200,
      component: ConditionalLanguageSelection
    })

    componentRegistry.registerToSlot('dataObject.editor.toolbar.slots.left', {
      name: 'languageComparisonView',
      priority: 300,
      component: LanguageComparisonViewButton
    })

    componentRegistry.registerToSlot('dataObject.editor.toolbar.slots.right', {
      name: 'workflowMenu',
      priority: 100,
      component: EditorToolbarWorkflowMenu
    })

    componentRegistry.registerToSlot('dataObject.editor.toolbar.slots.right', {
      name: 'saveButtons',
      priority: 200,
      component: DataObjectEditorToolbarSaveButtons
    })

    componentRegistry.register({
      name: componentConfig.dataObject.editor.tab.preview.name,
      component: PreviewView
    })

    componentRegistry.register({
      name: componentConfig.dataObject.editor.tab.versions.name,
      component: VersionViewContainer
    })

    componentRegistry.register({
      name: componentConfig.dataObject.editor.tab.listing.name,
      component: ListingContainer
    })

    componentRegistry.register({
      name: componentConfig.dataObject.editor.tab.edit.name,
      component: EditContainer
    })

    componentRegistry.register({
      name: componentConfig.dataObject.editor.tab.variants.name,
      component: VariantsTabContainer
    })
  }
})
