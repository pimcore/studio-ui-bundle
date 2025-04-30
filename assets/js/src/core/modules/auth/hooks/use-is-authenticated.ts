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
import { useUser } from '@Pimcore/modules/auth/hooks/use-user'

export const useIsAuthenticated = (): boolean => {
  const user = useUser()

  return useMemo(() => (user.username !== ''), [user])
}
