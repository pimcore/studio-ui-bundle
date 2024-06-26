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

import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { DefaultPage } from '@Pimcore/modules/app/default-page'
import { LoginPage } from '@Pimcore/modules/auth/login-page'
import { appConfig } from '../config/app-config'

let baseUrl = appConfig.baseUrl

if (baseUrl.endsWith('/')) {
  baseUrl = baseUrl.slice(0, -1)
}

export const routes = {
  root: baseUrl,
  login: `${baseUrl}/login`
}

export const router = createBrowserRouter([
  {
    path: routes.root,
    element: <DefaultPage />
  },
  {
    path: routes.login,
    element: <LoginPage />
  }
])
