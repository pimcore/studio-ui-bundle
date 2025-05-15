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
import { type GeneralFiltersDecoratorConfig } from '../../../general-filters-decorator'

export interface GeneralFiltersConfigContextProps extends GeneralFiltersDecoratorConfig {}

export const generalFiltersDecoratorDefaultConfig: GeneralFiltersDecoratorConfig = {
  handleSearchTermInSidebar: true
}

export const GeneralFiltersConfigContext = createContext<GeneralFiltersConfigContextProps>(generalFiltersDecoratorDefaultConfig)

export interface GeneralFiltersConfigProviderProps {
  children: React.ReactNode
  config?: GeneralFiltersConfigContextProps
}

export const GeneralFiltersConfigProvider = ({ children, config = generalFiltersDecoratorDefaultConfig }: GeneralFiltersConfigProviderProps): React.JSX.Element => {
  return useMemo(() => (
    <GeneralFiltersConfigContext.Provider value={ config }>
      {children}
    </GeneralFiltersConfigContext.Provider>
  ), [children, config])
}
