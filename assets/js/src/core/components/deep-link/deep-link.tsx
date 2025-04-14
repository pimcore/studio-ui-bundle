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

import { routes } from '@Pimcore/app/router/router'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const DeepLink = (): React.JSX.Element => {
  const { elementType, id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(routes.root, { state: { isDeeplink: true, id, elementType } })
  }, [id, elementType])

  return <></>
}
