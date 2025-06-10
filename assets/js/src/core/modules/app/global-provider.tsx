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
import { store } from '@sdk/app'
import { DragAndDropContextProvider } from '@sdk/components'
import { ThemeProvider } from '@Pimcore/modules/app/theme/theme-provider'
import React from 'react'
import { Provider } from 'react-redux'
import { ElementSelectorProvider } from '@sdk/modules/element'
import { UploadModalProvider } from '@Pimcore/components/modal-upload/provider/upload-modal-provider/upload-modal-provider'

export interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps): React.JSX.Element => {
  return (
    <ContainerProvider>
      <ThemeProvider>
        <Provider store={ store }>
          <DragAndDropContextProvider>
            <ElementSelectorProvider>
              <UploadModalProvider>
                {children}
              </UploadModalProvider>
            </ElementSelectorProvider>
          </DragAndDropContextProvider>
        </Provider>
      </ThemeProvider>
    </ContainerProvider>
  )
}
