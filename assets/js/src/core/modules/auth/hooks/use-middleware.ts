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

import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'
import { routes } from '@Pimcore/app/router/router'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'

export const useMiddleware = (): void => {
  const navigate = useNavigate()
  const location = useLocation()

  const isAuthenticated = useIsAuthenticated()
  const { openElement } = useElementHelper()

  // check if the current link is a deeplink
  const isDeeplink = location?.state?.isDeeplink

  const handleOpenDeepLink = (): void => {
    const id = location?.state?.id
    const elementType = location?.state?.elementType

    const fetchData = async (): Promise<void> => {
      if (!isEmpty(id) && !isEmpty(elementType)) {
        await openElement({ id: Number(id), type: elementType as ElementType })
      }
    }

    fetchData().catch((error) => {
      console.error('Error while opening element:', error)
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.root)

      if (isDeeplink === true) {
        handleOpenDeepLink()
      }
    }

    if (!isAuthenticated) {
      navigate(routes.login, { state: { ...location.state } })
    }
  }, [isAuthenticated])
}
