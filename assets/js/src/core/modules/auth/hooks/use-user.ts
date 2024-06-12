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

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { type IUser } from '@Pimcore/modules/auth/auth-api-slice'
import { selectCurrentUser } from '@Pimcore/modules/auth/user/user-slice'

export const useUser = (): IUser | null => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => (user), [user])
}
