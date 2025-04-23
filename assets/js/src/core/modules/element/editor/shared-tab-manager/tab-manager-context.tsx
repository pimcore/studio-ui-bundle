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
