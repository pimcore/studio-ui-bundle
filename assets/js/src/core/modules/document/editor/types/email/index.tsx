/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type EmailTabManager } from './tab-manager/email-tab-manager'
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
import { TAB_VERSIONS } from '@Pimcore/modules/data-object/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const emailEditorTabManager = container.get<EmailTabManager>(serviceIds['Document/Editor/EmailTabManager'])

    emailEditorTabManager.register(TAB_PROPERTIES)
    emailEditorTabManager.register(TAB_VERSIONS)
    emailEditorTabManager.register(TAB_DEPENDENCIES)
    emailEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    emailEditorTabManager.register(TAB_TAGS)
    emailEditorTabManager.register(TAB_WORKFLOW)
  }
})
