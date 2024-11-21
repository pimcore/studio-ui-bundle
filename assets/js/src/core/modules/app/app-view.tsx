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
import { RouterProvider } from 'react-router-dom'
import { router } from '@Pimcore/app/router/router'
import { AppLoader } from '@Pimcore/modules/app/app-loader'
import { DateTimeConfig } from '@Pimcore/app/config/date-time'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'

export const AppView = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <ErrorBoundary>
          <GlobalProvider>
            <AntApp>
              <DateTimeConfig>
                <AppLoader>
                  <RouterProvider router={ router } />
                </AppLoader>
              </DateTimeConfig>
            </AntApp>
          </GlobalProvider>
        </ErrorBoundary>
      </StrictMode>
    </>
  )
}
