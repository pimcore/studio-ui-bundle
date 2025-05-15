/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
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
