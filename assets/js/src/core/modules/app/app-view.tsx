/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { StrictMode } from 'react'
import { GlobalProvider } from './global-provider'
import { App as AntApp } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from '@Pimcore/app/router/router'
import { AppLoader } from '@Pimcore/modules/app/app-loader/app-loader'
import { DateTimeConfig } from '@Pimcore/app/config/date-time'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { ModalsProvider } from './modals-provider'
import { ApiGateway } from '@Pimcore/app/public-api/api-gateway'
import { TreeCopyPasteProvider } from '../element/actions/copy-paste/tree-copy-paste-context'

export const AppView = (): React.JSX.Element => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <GlobalProvider>
          <AntApp>
            <TreeCopyPasteProvider>
              <ModalsProvider>
                { <ApiGateway /> }
                <DateTimeConfig>
                  <AppLoader>
                    <RouterProvider router={ router } />
                  </AppLoader>
                </DateTimeConfig>
              </ModalsProvider>
            </TreeCopyPasteProvider>
          </AntApp>
        </GlobalProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
