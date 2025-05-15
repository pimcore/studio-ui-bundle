/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React from 'react'
import { type AudioTabManager } from './tab-manager/audio-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
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
import { Icon } from '@Pimcore/components/icon/icon'

moduleSystem.registerModule({
  onInit: () => {
    const audioTabManager = container.get<AudioTabManager>(serviceIds['Asset/Editor/AudioTabManager'])

    audioTabManager.register({
      key: 'view',
      label: 'asset.asset-editor-tabs.view',
      children: <PreviewContainer />,
      icon: <Icon value={ 'view' } />
    })

    audioTabManager.register(TAB_CUSTOM_METADATA)
    audioTabManager.register(TAB_PROPERTIES)
    audioTabManager.register(TAB_VERSIONS)
    audioTabManager.register(TAB_SCHEDULE)
    audioTabManager.register(TAB_DEPENDENCIES)
    audioTabManager.register(TAB_NOTES_AND_EVENTS)
    audioTabManager.register(TAB_TAGS)
    audioTabManager.register(TAB_WORKFLOW)
  }
})
