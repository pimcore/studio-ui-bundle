/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo } from 'react'
import { isUndefined } from 'lodash'
import { useActivateMaintenanceMode } from '../hooks/use-activate-maintenance-mode'

interface IMaintenanceModeContext {
  activateWithConfirmation: () => void
}

const MaintenanceModeContext = createContext<IMaintenanceModeContext | undefined>(undefined)

export interface MaintenanceModeProviderProps {
  children: React.ReactNode
}

// MainNav calls an entry's hook only while it is open, so the entry may only read this context
export const MaintenanceModeProvider = ({ children }: MaintenanceModeProviderProps): React.JSX.Element => {
  const { activateWithConfirmation } = useActivateMaintenanceMode()
  const value = useMemo(() => ({ activateWithConfirmation }), [activateWithConfirmation])

  return (
    <MaintenanceModeContext.Provider value={ value }>
      {children}
    </MaintenanceModeContext.Provider>
  )
}

export const useMaintenanceModeContext = (): IMaintenanceModeContext => {
  const context = useContext(MaintenanceModeContext)

  if (isUndefined(context)) {
    throw new Error('useMaintenanceModeContext must be used within a MaintenanceModeProvider')
  }

  return context
}
