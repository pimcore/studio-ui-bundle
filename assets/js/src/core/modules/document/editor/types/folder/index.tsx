/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type FolderTabManager } from './tab-manager/folder-tab-manager'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import {
  TAB_DEPENDENCIES,
  TAB_NOTES_AND_EVENTS,
  TAB_PROPERTIES,
  TAB_TAGS,
  TAB_WORKFLOW
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const folderEditorTabManager = container.get<FolderTabManager>(serviceIds['Document/Editor/FolderTabManager'])

    folderEditorTabManager.register(TAB_PROPERTIES)
    folderEditorTabManager.register(TAB_DEPENDENCIES)
    folderEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    folderEditorTabManager.register(TAB_TAGS)
    folderEditorTabManager.register(TAB_WORKFLOW)
  }
})
