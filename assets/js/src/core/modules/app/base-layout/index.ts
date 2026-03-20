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
import { componentConfig, type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
import { MainNav } from '@Pimcore/modules/app/base-layout/main-nav/main-nav'
import { Search } from '@Pimcore/modules/search/search'
import { NotificationButton } from '@Pimcore/modules/execution-engine/notification/notification-button'
import { Logo as LogoImage } from '@Pimcore/components/logo/logo'
import { Logo } from './right-sidebar/logo'
import { SubscriptionDetails } from './right-sidebar/logo/subscription-details'

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

    componentRegistry.registerToSlot(componentConfig.leftSidebar.slot.name, {
      name: 'runningJobs',
      priority: 200,
      component: NotificationButton
    })

    componentRegistry.registerToSlot(componentConfig.rightSidebar.slot.name, {
      name: 'logoContainer',
      priority: 100,
      component: Logo
    })

    componentRegistry.register({
      name: componentConfig.rightSidebar.logo.image.name,
      component: LogoImage
    })

    componentRegistry.register({
      name: componentConfig.rightSidebar.logo.subscriptionDetails.name,
      component: SubscriptionDetails
    })
  }
})
