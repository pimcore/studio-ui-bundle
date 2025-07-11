/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { ContainerProvider } from '@Pimcore/app/depency-injection'
import { store } from '@Pimcore/app/store'
import { ThemeProvider } from '@Pimcore/modules/app/theme/theme-provider'
import React from 'react'
import { Provider } from 'react-redux'
import { ElementSelectorProvider } from '@sdk/modules/element'
import { UploadModalProvider } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/upload-modal-provider'
import { ApiGateway } from '@Pimcore/app/public-api/api-gateway'
import { isInIframe } from '@Pimcore/utils/iframe'
import { LinkModalProvider } from '../element/dynamic-types/definitions/objects/data-related/components/link/provider/link-modal-provider'

export interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps): React.JSX.Element => {
  return (
    <ContainerProvider>
      <ThemeProvider>
        <Provider store={ store }>
          <ElementSelectorProvider>
            <UploadModalProvider>
              <LinkModalProvider>
                { !isInIframe() && <ApiGateway /> }
                {children}
              </LinkModalProvider>
            </UploadModalProvider>
          </ElementSelectorProvider>
        </Provider>
      </ThemeProvider>
    </ContainerProvider>
  )
}
