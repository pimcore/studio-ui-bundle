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

import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LOGIN_URL } from '@Pimcore/app/router/router'

export const DeepLink = (): React.JSX.Element => {
  const { elementType, id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    navigate(LOGIN_URL, { state: { isDeeplink: true, id, elementType } })
  }, [id, elementType])

  return <></>
}
