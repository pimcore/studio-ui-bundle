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

import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { App as AntApp } from 'antd'
import { router } from '@Pimcore/router/router'
import { RouterProvider } from 'react-router-dom'

export const AppView = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <AntApp>
            <RouterProvider router={ router } />
          </AntApp>
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
