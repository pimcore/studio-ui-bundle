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

import React from 'react'
import { Icon } from '@Pimcore/components/icon/icon'
import { EditTabContainer } from '@Pimcore/modules/asset/editor/types/image/tab-manager/tabs/edit/edit-container'
import { type ImageTabManager } from './tab-manager/image-tab-manager'
import { PreviewContainer } from './tab-manager/tabs/preview/preview-container'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { DetachedTab } from '@Pimcore/modules/asset/editor/detached-tab/detached-tab'
import {
  TAB_CUSTOM_METADATA,
  TAB_EMBEDDED_METADATA,
  TAB_NOTES_AND_EVENTS,
  TAB_TAGS,
  TAB_VERSIONS,
  TAB_WORKFLOW
} from '@Pimcore/modules/asset/editor/shared-tab-manager/tab-definitions'
import {
  TAB_DEPENDENCIES,
  TAB_PROPERTIES, TAB_SCHEDULE
} from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'

moduleSystem.registerModule({
  onInit: () => {
    const imageEditorTabManager = container.get<ImageTabManager>(serviceIds['Asset/Editor/ImageTabManager'])

    imageEditorTabManager.register({
      key: 'view',
      label: 'asset.asset-editor-tabs.view',
      children: <PreviewContainer />,
      icon: <Icon name={ 'image-05' } />
    })

    imageEditorTabManager.register({
      key: 'edit',
      label: 'asset.asset-editor-tabs.edit',
      children: <EditTabContainer />,
      icon: <Icon name={ 'edit' } />
    })

    imageEditorTabManager.register(TAB_EMBEDDED_METADATA)
    imageEditorTabManager.register(TAB_CUSTOM_METADATA)
    imageEditorTabManager.register(TAB_PROPERTIES)
    imageEditorTabManager.register(TAB_VERSIONS)
    imageEditorTabManager.register(TAB_SCHEDULE)
    imageEditorTabManager.register(TAB_DEPENDENCIES)
    imageEditorTabManager.register(TAB_NOTES_AND_EVENTS)
    imageEditorTabManager.register(TAB_TAGS)
    imageEditorTabManager.register(TAB_WORKFLOW)

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'detachable-tab',
      component: DetachedTab
    })
  }
})
