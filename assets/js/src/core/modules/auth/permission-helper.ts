/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import { type IEditorTab } from '@Pimcore/modules/element/editor/tab-manager/interface/IEditorTab'
import { store } from '@Pimcore/app/store'
import { selectCurrentUser, type userSliceName } from '@Pimcore/modules/auth/user/user-slice'
import type { UserInformation } from '@Pimcore/modules/auth/user/user-api-slice.gen'

export const isAllowed = (permission: IEditorTab['userPermission']): boolean => {
  const state = store.getState()
  const user = selectCurrentUser(state as { [userSliceName]: UserInformation })

  if (user.isAdmin) {
    return true
  }

  return (permission !== undefined && user.permissions.includes(permission))
}
