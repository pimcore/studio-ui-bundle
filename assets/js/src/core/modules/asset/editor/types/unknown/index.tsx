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

import { type UnknownTabManager } from './tab-manager/unknown-tab-manager'
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
    const unknownTabManager = container.get<UnknownTabManager>(serviceIds['Asset/Editor/UnknownTabManager'])

    unknownTabManager.register(TAB_CUSTOM_METADATA)
    unknownTabManager.register(TAB_PROPERTIES)
    unknownTabManager.register(TAB_VERSIONS)
    unknownTabManager.register(TAB_SCHEDULE)
    unknownTabManager.register(TAB_DEPENDENCIES)
    unknownTabManager.register(TAB_NOTES_AND_EVENTS)
    unknownTabManager.register(TAB_TAGS)
    unknownTabManager.register(TAB_WORKFLOW)
  }
})
