/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { MainNav } from '@Pimcore/modules/app/base-layout/main-nav/main-nav'
import { Search } from '@Pimcore/modules/search/search'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.registerToSlot('leftSidebar.slot', {
      name: 'mainNav',
      priority: 100,
      component: MainNav
    })

    componentRegistry.registerToSlot('leftSidebar.slot', {
      name: 'search',
      priority: 200,
      component: Search
    })
  }
})
