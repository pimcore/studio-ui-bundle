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
import { contextMenuConfig } from '@Pimcore/modules/app/context-menu-registry/context-menu-config'
import { type ContextMenuRegistryInterface } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { LoginFormDivider } from '@Pimcore/modules/auth/components/login-form/login-form-divider/login-form-divider'
import { logoutUserMenuItemProvider } from './logout-user-menu-item'
import { profileUserMenuItemProvider } from './profile/user-menu-item'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.registerToSlot(componentConfig.form.login.name, {
      name: 'loginFormDivider',
      priority: 0,
      component: LoginFormDivider
    })

    const contextMenuRegistry = container.get<ContextMenuRegistryInterface>(
      serviceIds['App/ContextMenuRegistry/ContextMenuRegistry']
    )
    contextMenuRegistry.registerToSlot(contextMenuConfig.userMenu.name, profileUserMenuItemProvider)
    contextMenuRegistry.registerToSlot(contextMenuConfig.userMenu.name, logoutUserMenuItemProvider)
  }
})
