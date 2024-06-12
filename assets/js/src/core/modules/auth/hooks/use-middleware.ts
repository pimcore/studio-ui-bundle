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

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'

export const useMiddleware = (): void => {
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/studio')
    }

    if (!isAuthenticated) {
      navigate('/admin/studio/login')
    }
  }, [isAuthenticated])
}
