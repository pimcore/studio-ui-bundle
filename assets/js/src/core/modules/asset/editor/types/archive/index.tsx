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

import { type ArchiveTabManager } from './tab-manager/archive-tab-manager'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { TAB_CUSTOM_METADATA, TAB_VERSIONS } from '@Pimcore/modules/asset/editor/shared-tab-manager/tab-definitions'
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
    const archiveTabManager = container.get<ArchiveTabManager>(serviceIds['Asset/Editor/ArchiveTabManager'])

    archiveTabManager.register(TAB_CUSTOM_METADATA)
    archiveTabManager.register(TAB_PROPERTIES)
    archiveTabManager.register(TAB_VERSIONS)
    archiveTabManager.register(TAB_SCHEDULE)
    archiveTabManager.register(TAB_DEPENDENCIES)
    archiveTabManager.register(TAB_NOTES_AND_EVENTS)
    archiveTabManager.register(TAB_TAGS)
    archiveTabManager.register(TAB_WORKFLOW)
  }
})
