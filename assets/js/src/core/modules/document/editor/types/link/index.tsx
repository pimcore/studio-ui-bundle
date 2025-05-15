/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type LinkTabManager } from './tab-manager/link-tab-manager'
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
    const linkEditorTabManager = container.get<LinkTabManager>(serviceIds['Document/Editor/LinkTabManager'])

    linkEditorTabManager.register(TAB_PROPERTIES)
    linkEditorTabManager.register(TAB_SCHEDULE)
    linkEditorTabManager.register(TAB_DEPENDENCIES)
    linkEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    linkEditorTabManager.register(TAB_TAGS)
    linkEditorTabManager.register(TAB_WORKFLOW)
  }
})
