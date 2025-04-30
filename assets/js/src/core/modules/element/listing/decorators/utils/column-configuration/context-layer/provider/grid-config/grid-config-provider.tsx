/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type GridDetailedConfiguration as AssetGridDetailedConfiguration } from '@Pimcore/modules/asset/asset-api-slice-enhanced'
import { type GridDetailedConfiguration as ObjectGridDetailedConfiguration } from '@Pimcore/modules/data-object/data-object-api-slice-enhanced'
import React, { createContext, useMemo, useState } from 'react'

// @todo Create a union type for all the different element types
export type GridConfig = AssetGridDetailedConfiguration | ObjectGridDetailedConfiguration

export interface GridConfigData {
  gridConfig: GridConfig | undefined
  setGridConfig: (gridConfig: GridConfig) => void
}

export type GridConfigContextProps = GridConfigData | undefined

export const GridConfigContext = createContext<GridConfigContextProps>(undefined)

export interface GridConfigProviderProps {
  children: React.ReactNode
}

export const GridConfigProvider = ({ children }: GridConfigProviderProps): React.JSX.Element => {
  const [gridConfig, setGridConfig] = useState<GridConfigData['gridConfig']>()

  return useMemo(() => (
    <GridConfigContext.Provider value={ { gridConfig, setGridConfig } }>
      {children}
    </GridConfigContext.Provider>
  ), [gridConfig])
}
