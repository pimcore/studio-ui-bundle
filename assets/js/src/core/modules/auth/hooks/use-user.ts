/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'
import { type UserInformation } from '../user/user-api-slice.gen'

interface IExtendsUserInformation extends UserInformation {
  modified?: boolean
  modifiedCells?: Record<string, boolean>
}

export const useUser = (): IExtendsUserInformation => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => (user), [user])
}
