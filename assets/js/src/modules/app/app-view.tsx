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
import { BaseLayoutView } from '@Pimcore/modules/app/base-layout/base-layout-view'
import { App as AntApp } from 'antd'
import { TranslationsLoaderContainer } from '@Pimcore/modules/app/translations/translations-loader-container'
import { Background } from '@Pimcore/components/background/background'

export const AppView = (): React.JSX.Element => {
  return (
    <>
      <StrictMode>
        <GlobalProvider>
          <AntApp>
            <Background />
            <TranslationsLoaderContainer>
              <BaseLayoutView />
            </TranslationsLoaderContainer>
          </AntApp>
        </GlobalProvider>
      </StrictMode>
    </>
  )
}
