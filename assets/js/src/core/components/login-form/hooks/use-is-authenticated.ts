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

import { useUser } from '@Pimcore/components/login-form/hooks/use-user'
import { useMemo } from 'react'

export const useIsAuthenticated = (): boolean => {
  const user = useUser()

  return useMemo(() => (user?.username !== null), [user])
}
