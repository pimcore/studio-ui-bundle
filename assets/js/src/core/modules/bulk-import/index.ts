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
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type MainNavRegistry } from '@Pimcore/modules/app/base-layout/main-nav/services/main-nav-registry'
import { useBulkImportContext } from '@Pimcore/modules/bulk-import/components/bulk-import-modal/context/bulk-import-context'
import { UserPermission } from '@sdk/modules/auth'
import { NavPermission } from '@sdk/modules/perspectives'
import { type JobRehydrationRegistry } from '@Pimcore/modules/execution-engine/services/job-rehydration-registry'
import { BulkImportJob } from '@Pimcore/modules/bulk-import/jobs/bulk-import-job'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions',
      label: 'navigation.data-model-definitions',
      order: 1200
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions/BulkImport',
      label: 'navigation.bulk-import',
      order: 800,
      permission: UserPermission.Classes,
      perspectivePermission: NavPermission.BulkImport,
      useCustomMainNavItem: () => {
        const { open } = useBulkImportContext()

        return {
          name: 'DataModelDefinitionsBulkImport',
          onClick: open
        }
      }
    })

    const rehydrationRegistry = container.get<JobRehydrationRegistry>(serviceIds['ExecutionEngine/JobRehydrationRegistry'])

    rehydrationRegistry.register(BulkImportJob)
  }
})
