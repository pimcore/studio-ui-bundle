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
