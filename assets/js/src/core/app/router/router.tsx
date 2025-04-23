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

import { DeepLink } from '@Pimcore/components/deep-link/deep-link'
import { DefaultPage } from '@Pimcore/modules/app/default-page'
import { useIsAuthenticated } from '@Pimcore/modules/auth/hooks/use-is-authenticated'
import { LoginPage } from '@Pimcore/modules/auth/login-page'
import React from 'react'
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { appConfig } from '../config/app-config'

export const baseUrl = appConfig.baseUrl.endsWith('/')
  ? appConfig.baseUrl.slice(0, -1) + '/'
  : appConfig.baseUrl

export const LOGIN_URL = `${baseUrl}login/`
export const DEEP_LINK_URL = `${baseUrl}:elementType/:id`

export const routes = {
  root: baseUrl,
  login: LOGIN_URL,
  deeplinkAsset: DEEP_LINK_URL
}

const AuthenticatedRoute = ({ children }: { children: React.JSX.Element }): React.ReactElement => {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  return isAuthenticated
    ? children
    : (
      <Navigate
        state={ { from: location } }
        to={ routes.login }
      />
      )
}

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <AuthenticatedRoute>
      <DefaultPage />
    </AuthenticatedRoute>
  },
  {
    path: routes.login,
    element: <LoginPage />
  },
  {
    path: routes.deeplinkAsset,
    element: <AuthenticatedRoute>
      <DeepLink />
    </AuthenticatedRoute>
  }
])
