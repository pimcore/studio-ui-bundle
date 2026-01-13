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
import { type MainNavRegistry } from '@sdk/modules/app'
import { NavPermission } from '../perspectives/enums/nav-permission'
import { useAboutDialogContext } from '@Pimcore/modules/about/components/about-dialog/context/about-dialog-data-context'

moduleSystem.registerModule({
  onInit: () => {
    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'System/About',
      label: 'navigation.about',
      className: 'item-style-modifier',
      order: 9999,
      perspectivePermission: NavPermission.About,
      useMainNavItem: () => {
        const { open } = useAboutDialogContext()

        return {
          name: 'SystemAbout',
          onClick: open
        }
      }
    })
  }
})
