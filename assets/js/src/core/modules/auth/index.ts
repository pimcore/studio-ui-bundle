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
import { LoginFormDivider } from '@Pimcore/modules/auth/components/login-form/login-form-divider/login-form-divider'

moduleSystem.registerModule({
  onInit: () => {
    const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])

    componentRegistry.registerToSlot(componentConfig.form.login.name, {
      name: 'loginFormDivider',
      priority: 0,
      component: LoginFormDivider
    })
  }
})
