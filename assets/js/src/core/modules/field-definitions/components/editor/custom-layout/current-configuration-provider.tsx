/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type ConfigurationPartial } from '@Pimcore/modules/field-definitions/components/editor/items/provider'
import React, { createContext, useMemo } from 'react'

export interface ICurrentConfigurationContext {
  configuration: ConfigurationPartial | undefined
}

export const CurrentConfigurationContext = createContext<ICurrentConfigurationContext | undefined>(undefined)

export interface CurrentConfigurationProviderProps {
  configuration: ConfigurationPartial | undefined
  children: React.ReactNode
}

export const CurrentConfigurationProvider = (props: CurrentConfigurationProviderProps): React.JSX.Element => {
  const { configuration, children } = props

  return useMemo(() => (
    <CurrentConfigurationContext.Provider value={ { configuration } }>
      {children}
    </CurrentConfigurationContext.Provider>
  ), [configuration, children])
}

export const useCurrentConfiguration = (): ICurrentConfigurationContext => {
  const context = React.useContext(CurrentConfigurationContext)

  if (context === undefined) {
    throw new Error('useCurrentConfiguration must be used within a CurrentConfigurationProvider')
  }

  return context
}
