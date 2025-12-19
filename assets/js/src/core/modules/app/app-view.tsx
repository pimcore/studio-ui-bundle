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
import { DateTimeConfig } from '@Pimcore/app/config/date-time'
import ErrorBoundary from '@Pimcore/modules/app/error-boundary/error-boundary'
import { ModalsProvider } from './modals-provider'
import { ApiGateway } from '@Pimcore/app/public-api/api-gateway'
import { TreeCopyPasteProvider } from '../element/actions/copy-paste/tree-copy-paste-context'
import { Background } from '@Pimcore/components/background/background'
import { useAppSelector } from '@Pimcore/app/store'

const AppContent = (): React.JSX.Element => {
  const isEnabled = useAppSelector((state) => state.ui?.isBackgroundAnimationEnabled ?? true)

  return (
    <>
      <Background loading={isEnabled} />
      <AntApp>
        <TreeCopyPasteProvider>
          <ModalsProvider>
            { <ApiGateway /> }
            <DateTimeConfig>
              <RouterProvider router={ router } />
            </DateTimeConfig>
          </ModalsProvider>
        </TreeCopyPasteProvider>
      </AntApp>
    </>
  )
}

export const AppView = (): React.JSX.Element => {
  return (
    <StrictMode>
      <ErrorBoundary>
        <GlobalProvider>
          <AppContent />
        </GlobalProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
