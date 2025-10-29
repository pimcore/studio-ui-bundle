/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type WidgetRegistry } from '@Pimcore/modules/widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import '@Pimcore/modules/element/editor'
import { TreeWidget } from './tree/tree-widget'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { isAllowed } from '@Pimcore/modules/auth/permission-helper'
import { UserPermission } from '@Pimcore/modules/auth/enums/user-permission'
import { has } from 'lodash'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'element_tree',
      component: TreeWidget,
      transformConfig: (config) => ({
        ...config,
        translationKey: config.name
      }),
      isVisible: (widget) => {
        if (has(widget, 'elementType')) {
          switch (widget.elementType) {
            case 'document':
              return isAllowed(UserPermission.Documents)
            case 'asset':
              return isAllowed(UserPermission.Assets)
            case 'data-object':
              return isAllowed(UserPermission.Objects)
            default:
              return true
          }
        }
        return true
      }
    })
  }
})
