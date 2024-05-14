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
import DefaultLayout from '@Pimcore/router/layouts/default'
import LoginLayout from '@Pimcore/router/layouts/login/login'

export const router = createBrowserRouter([
  {
    path: '/admin/studio',
    element: <DefaultLayout />
  },
  {
    path: '/admin/studio/login',
    element: <LoginLayout />
  }
])
