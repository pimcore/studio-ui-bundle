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

import React, { createContext, useMemo } from 'react'
import { type Settings } from '../../../../hooks/with-configuration-sidebar-entry'

export interface SettingsContextProps extends Settings {}

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined)

export interface SettingsProviderProps {
  children: React.ReactNode
  settings?: Settings
}

export const SettingsProvider = ({ children, settings }: SettingsProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <SettingsContext.Provider value={ settings }>
      {children}
    </SettingsContext.Provider>
  ), [settings, children])
}
