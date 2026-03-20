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
import { useBulkExportContext } from '@Pimcore/modules/bulk-export/components/bulk-export-modal/context/bulk-export-context'
import { UserPermission } from '@sdk/modules/auth'
import { NavPermission } from '@sdk/modules/perspectives'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions',
      label: 'navigation.data-model-definitions',
      order: 1200
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'DataManagement/DataModelDefinitions/BulkExport',
      label: 'navigation.bulk-export',
      order: 700,
      permission: UserPermission.Classes,
      perspectivePermission: NavPermission.BulkExport,
      useCustomMainNavItem: () => {
        const { open } = useBulkExportContext()

        return {
          name: 'DataModelDefinitionsBulkExport',
          onClick: open
        }
      }
    })
  }
})
