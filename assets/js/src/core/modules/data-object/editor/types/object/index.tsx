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

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services'
import type { WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { DetachedTab } from '@Pimcore/modules/data-object/editor/detached-tab/detached-tab'
import { TAB_PROPERTIES } from '@Pimcore/modules/element/editor/shared-tab-manager/tab-definitions'
import { type ObjectTabManager } from '@Pimcore/modules/data-object/editor/types/object/tab-manager/object-tab-manager'

moduleSystem.registerModule({
  onInit: () => {
    const objectEditorTabManager = container.get<ObjectTabManager>(serviceIds['DataObject/Editor/ObjectTabManager'])
    /*
    objectEditorTabManager.register({
      key: 'view',
      label: 'asset.asset-editor-tabs.view',
      children: <PreviewContainer />,
      icon: <Icon name={ 'image-05' } />
    })

    objectEditorTabManager.register({
      key: 'edit',
      label: 'asset.asset-editor-tabs.edit',
      children: <EditTabContainer />,
      icon: <Icon name={ 'edit' } />
    }) */
    console.log('tab prop')
    objectEditorTabManager.register(TAB_PROPERTIES)

    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)
    widgetRegistryService.registerWidget({
      name: 'detachable-tab',
      component: DetachedTab
    })
  }
})