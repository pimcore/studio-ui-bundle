/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode } from 'react'
import { type Sizings } from '../box/box'

interface ContentConfigProviderProps {
  children: ReactNode
  gap?: Sizings
}

interface ContentConfigContextValue {
  gap?: Sizings
}

const ContentConfigContext = createContext<ContentConfigContextValue>({})

export const ContentConfigProvider = ({
  children,
  gap
}: ContentConfigProviderProps): React.JSX.Element => {
  return (
    <ContentConfigContext.Provider value={{ gap }}>
      {children}
    </ContentConfigContext.Provider>
  )
}

export const useContentConfig = (): ContentConfigContextValue => {
  return useContext(ContentConfigContext)
}
