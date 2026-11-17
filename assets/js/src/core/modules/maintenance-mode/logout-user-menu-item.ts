/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isNil, isUndefined } from 'lodash'
import { type ContextMenuItemProviderUpdate } from '@Pimcore/modules/app/context-menu-registry/context-menu-registry'
import { useLogoutCheck } from './hooks/use-logout-check'

export const logoutUserMenuItemUpdate: ContextMenuItemProviderUpdate = (provider) => ({
  ...provider,
  useMenuItem: (context) => {
    const item = provider.useMenuItem(context)
    const checkLogout = useLogoutCheck()

    if (isNil(item) || !('onClick' in item) || isUndefined(item.onClick)) {
      return item
    }

    const logout = item.onClick

    return {
      ...item,
      onClick: (info: Parameters<typeof logout>[0]) => { checkLogout(() => { logout(info) }) }
    }
  }
})
