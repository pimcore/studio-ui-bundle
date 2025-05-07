/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { DataObjectTreeContextMenu } from '@Pimcore/modules/data-object/tree/context-menu/context-menu'
import { componentConfig } from '@Pimcore/modules/app/component-registry/component-config'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: componentConfig.dataObject.tree.contextMenu.name,
      component: DataObjectTreeContextMenu
    })
  }
})
