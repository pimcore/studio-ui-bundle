/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type PageTabManager } from './tab-manager/page-tab-manager'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import {
  TAB_DEPENDENCIES,
  TAB_NOTES_AND_EVENTS,
  TAB_PROPERTIES,
  TAB_SCHEDULE,
  TAB_TAGS,
  TAB_WORKFLOW
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'
import { TAB_EDIT, TAB_VERSIONS, TAB_PREVIEW } from '../../shared-tab-manager/tab-definitions'
import { type DocumentSidebarManager } from '../../sidebar/document-sidebar-manager'
import {
  SIDEBAR_AREABLOCK_TYPES,
  SIDEBAR_CONTENT_SETTINGS,
  SIDEBAR_DOCUMENT_CONFIGURATION,
  SIDEBAR_NAVIGATION
} from '../../shared-tab-manager/sidebar-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const pageEditorTabManager = container.get<PageTabManager>(serviceIds['Document/Editor/PageTabManager'])

    pageEditorTabManager.register(TAB_EDIT)
    pageEditorTabManager.register(TAB_PREVIEW)
    pageEditorTabManager.register(TAB_PROPERTIES)
    pageEditorTabManager.register(TAB_VERSIONS)
    pageEditorTabManager.register(TAB_SCHEDULE)
    pageEditorTabManager.register(TAB_DEPENDENCIES)
    pageEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    pageEditorTabManager.register(TAB_TAGS)
    pageEditorTabManager.register(TAB_WORKFLOW)

    const pageSidebarManager = container.get<DocumentSidebarManager>(serviceIds['Document/Editor/Sidebar/PageSidebarManager'])

    pageSidebarManager.registerEntry(SIDEBAR_AREABLOCK_TYPES)
    pageSidebarManager.registerEntry(SIDEBAR_CONTENT_SETTINGS)
    pageSidebarManager.registerEntry(SIDEBAR_DOCUMENT_CONFIGURATION)
    pageSidebarManager.registerEntry(SIDEBAR_NAVIGATION)
  }
})
