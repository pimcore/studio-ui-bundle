/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { store } from '@sdk/app'
import { selectCurrentUser, type userSliceName } from '@Pimcore/modules/auth/user/user-slice'
import type { UserInformation } from '@Pimcore/modules/auth/user/user-api-slice-enhanced'

export const isAllowed = (permission: IEditorTab['userPermission']): boolean => {
  const state = store.getState()
  const user = selectCurrentUser(state as { [userSliceName]: UserInformation })

  if (user.isAdmin) {
    return true
  }

  return (permission !== undefined && user.permissions.includes(permission))
}
