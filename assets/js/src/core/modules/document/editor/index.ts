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
import '@Pimcore/modules/document/editor/types/email'
import '@Pimcore/modules/document/editor/types/folder'
import '@Pimcore/modules/document/editor/types/hardlink'
import '@Pimcore/modules/document/editor/types/link'
import '@Pimcore/modules/document/editor/types/page'
import '@Pimcore/modules/document/editor/types/snippet'
import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { DocumentEditorWidget } from './widget'
import {
  componentConfig,
  type ComponentRegistry as GlobalComponentRegistry
} from '@Pimcore/modules/app/component-registry/component-registry'
import { EditorContainer } from './editor-container'
import { type TypeRegistryInterface } from '@Pimcore/modules/element/editor/services/type-registry'
import { EditorToolbarContextMenu } from './toolbar/context-menu/context-menu'
import { EditorToolbarWorkflowMenu } from '@Pimcore/modules/asset/editor/toolbar/workflow-menu/workflow-menu'
import { EditorToolbarSaveButtons } from './toolbar/save-buttons/save-buttons'

moduleSystem.registerModule({
  onInit: () => {
    const typeRegistry = container.get<TypeRegistryInterface>(serviceIds['Document/Editor/TypeRegistry'])

    typeRegistry.register({
      name: 'page',
      tabManagerServiceId: 'Document/Editor/PageTabManager'
    })

    typeRegistry.register({
      name: 'email',
      tabManagerServiceId: 'Document/Editor/EmailTabManager'
    })

    typeRegistry.register({
      name: 'folder',
      tabManagerServiceId: 'Document/Editor/FolderTabManager'
    })

    typeRegistry.register({
      name: 'hardlink',
      tabManagerServiceId: 'Document/Editor/HardlinkTabManager'
    })

    typeRegistry.register({
      name: 'link',
      tabManagerServiceId: 'Document/Editor/LinkTabManager'
    })

    typeRegistry.register({
      name: 'snippet',
      tabManagerServiceId: 'Document/Editor/SnippetTabManager'
    })

    const componentRegistry = container.get<GlobalComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
    componentRegistry.register({
      name: componentConfig.document.editor.container.name,
      component: EditorContainer
    })

    componentRegistry.registerToSlot(componentConfig.document.editor.toolbar.slots.left.name, {
      name: 'contextMenu',
      priority: 100,
      component: EditorToolbarContextMenu
    })


    componentRegistry.registerToSlot(componentConfig.document.editor.toolbar.slots.right.name, {
      name: 'workflowMenu',
      priority: 100,
      component: EditorToolbarWorkflowMenu
    })

    componentRegistry.registerToSlot(componentConfig.document.editor.toolbar.slots.right.name, {
      name: 'saveButtons',
      priority: 200,
      component: EditorToolbarSaveButtons
    })

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget(DocumentEditorWidget)
    
  }
})
