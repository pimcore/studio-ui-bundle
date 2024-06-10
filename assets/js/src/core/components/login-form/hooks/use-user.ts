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
import { selectCurrentUser } from '@Pimcore/app/auth/auth-slice'
import { type IUser } from '@Pimcore/components/login-form/services/auth'

export const useUser = (): IUser | null => {
  const user = useSelector(selectCurrentUser)

  return useMemo(() => (user), [user])
}
