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
import { type WidgetRegistry } from '../widget-manager/services/widget-registry'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { EmailBlocklistContainer } from './blocklist/email-blocklist-container'
import { EmailLogContainer } from './log/email-log-container'
import { type MainNavRegistry } from '../app/base-layout/main-nav/services/main-nav-registry'
import { UserPermission } from '../auth/enums/user-permission'
import { NavPermission } from '../perspectives/enums/nav-permission'

moduleSystem.registerModule({
  onInit: () => {
    const widgetRegistryService = container.get<WidgetRegistry>(serviceIds.widgetManager)

    widgetRegistryService.registerWidget({
      name: 'email-blocklist',
      component: EmailBlocklistContainer
    })

    widgetRegistryService.registerWidget({
      name: 'email-log',
      component: EmailLogContainer
    })

    const mainNavRegistryService = container.get<MainNavRegistry>(serviceIds.mainNavRegistry)

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce/Email',
      label: 'navigation.email',
      order: 3,
      permission: UserPermission.Emails,
      perspectivePermission: NavPermission.Mails
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce/Email/Sent-Emails',
      label: 'navigation.email-log',
      className: 'item-style-modifier',
      permission: UserPermission.Emails,
      perspectivePermission: NavPermission.Mails,
      widgetConfig: {
        name: 'emailLog',
        id: 'email-log',
        component: 'email-log',
        config: {
          translationKey: 'widget.email-log',
          icon: {
            type: 'name',
            value: 'mail-02'
          }
        }
      }
    })

    mainNavRegistryService.registerMainNavItem({
      path: 'ExperienceEcommerce/Email/Email-Blocklist',
      label: 'navigation.email-blocklist',
      className: 'item-style-modifier',
      permission: UserPermission.Emails,
      perspectivePermission: NavPermission.Mails,
      widgetConfig: {
        name: 'EmailBlocklist',
        id: 'email-blocklist',
        component: 'email-blocklist',
        config: {
          translationKey: 'widget.email-blocklist',
          icon: {
            type: 'name',
            value: 'mail-02'
          }
        }
      }
    })
  }
})
