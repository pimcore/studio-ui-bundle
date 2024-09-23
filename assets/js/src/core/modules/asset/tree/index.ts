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

import '@Pimcore/modules/asset/editor'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { container } from '@Pimcore/app/depency-injection'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { serviceIds } from '@Pimcore/app/config/services'
import { AssetTreeContextMenu } from '@Pimcore/modules/asset/tree/context-menu/context-menu'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.register({
      name: 'assetTreeContextMenu',
      component: AssetTreeContextMenu
    })
  }
})
