/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type HardlinkTabManager } from './tab-manager/hardlink-tab-manager'
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

moduleSystem.registerModule({
  onInit: () => {
    const hardlinkEditorTabManager = container.get<HardlinkTabManager>(serviceIds['Document/Editor/HardlinkTabManager'])

    hardlinkEditorTabManager.register(TAB_PROPERTIES)
    hardlinkEditorTabManager.register(TAB_DEPENDENCIES)
    hardlinkEditorTabManager.register(TAB_SCHEDULE)
    hardlinkEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    hardlinkEditorTabManager.register(TAB_TAGS)
    hardlinkEditorTabManager.register(TAB_WORKFLOW)
  }
})
