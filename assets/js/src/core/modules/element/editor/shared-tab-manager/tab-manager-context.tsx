/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type TabManager } from '@Pimcore/modules/element/editor/tab-manager/tab-manager'
import React, { createContext, useMemo } from 'react'

export interface TabManagerContextProps {
  tabManager: TabManager | null
}

export const TabManagerContext = createContext<TabManagerContextProps>({
  tabManager: null
})

export interface TabManagerProviderProps extends TabManagerContextProps {
  children: React.ReactNode
}

export const TabManagerProvider = ({ tabManager, children }: TabManagerProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <TabManagerContext.Provider value={ { tabManager } }>
      {children}
    </TabManagerContext.Provider>
  ), [tabManager, children])
}
