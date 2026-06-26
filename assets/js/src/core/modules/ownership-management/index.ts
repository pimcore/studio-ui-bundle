/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { container } from '@Pimcore/app/depency-injection'
import { moduleSystem } from '@Pimcore/app/module-system/module-system'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { store } from '@Pimcore/app/store'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { type WidgetManagerTabConfig } from '@Pimcore/modules/widget-manager/widget-manager-slice'
import { type JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { OwnershipManagementContainer } from './ownership-management-container'
import { OwnershipReassignOwnerJob } from '@Pimcore/modules/execution-engine/jobs/ownership-management/ownership-reassign-owner-job'
import { OwnershipDeleteJob } from '@Pimcore/modules/execution-engine/jobs/ownership-management/ownership-delete-job'

export const OWNERSHIP_MANAGEMENT_WIDGET: WidgetManagerTabConfig = {
  name: 'ownershipManagement',
  id: 'ownership-management',
  component: 'ownership-management',
  config: {
    translationKey: 'ownership-management.title',
    icon: {
      type: 'name',
      value: 'ownership'
    }
  }
}

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'ownership-management',
      component: OwnershipManagementContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/Ownership Management',
      label: 'ownership-management.title',
      order: 500,
      perspectivePermission: NavPermission.OwnershipManagement,
      hidden: () => !selectCurrentUser(store.getState()).isAdmin,
      widgetConfig: OWNERSHIP_MANAGEMENT_WIDGET
    })

    const rehydrationRegistry = container.get<JobRehydrationRegistry>(
      serviceIds['ExecutionEngine/JobRehydrationRegistry']
    )
    rehydrationRegistry.register(OwnershipReassignOwnerJob)
    rehydrationRegistry.register(OwnershipDeleteJob)
  }
})
