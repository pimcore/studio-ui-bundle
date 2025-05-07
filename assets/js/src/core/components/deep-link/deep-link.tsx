/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
