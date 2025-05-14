/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type SnippetTabManager } from './tab-manager/snippet-tab-manager'
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
import { TAB_VERSIONS } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const snippetEditorTabManager = container.get<SnippetTabManager>(serviceIds['Document/Editor/SnippetTabManager'])

    snippetEditorTabManager.register(TAB_PROPERTIES)
    snippetEditorTabManager.register(TAB_VERSIONS)
    snippetEditorTabManager.register(TAB_SCHEDULE)
    snippetEditorTabManager.register(TAB_DEPENDENCIES)
    snippetEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    snippetEditorTabManager.register(TAB_TAGS)
    snippetEditorTabManager.register(TAB_WORKFLOW)
  }
})
