/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { store } from '@Pimcore/app/store'
import { type UserInformation } from '../user/user-api-slice.gen'
import { selectCurrentUser } from '../user/user-slice'

export const getCurrentUser = (): UserInformation => {
  const user = selectCurrentUser(store.getState())

  if (user.id === 0) {
    console.warn(
      'getCurrentUser() returned the system user (id 0). This usually means it was ' +
      'called before the current user was loaded, e.g. during a module\'s onInit(). ' +
      'Read the user inside a component instead, for example via the useUser() hook.'
    )
  }

  return user
}
