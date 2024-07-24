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

import React, { useMemo, useState } from 'react'
import { type GridColumnConfiguration } from '@Pimcore/modules/asset/asset-api-slice.gen'

export interface IGridConfigContext {
  columns: GridColumnConfiguration[]
  setColumns: React.Dispatch<React.SetStateAction<GridColumnConfiguration[]>>
}

export const GridConfigContext = React.createContext<IGridConfigContext>({
  columns: [],
  setColumns: () => {}
})

export interface GridConfigProviderProps {
  children: React.ReactNode
}

export const GridConfigProvider = ({ children }: GridConfigProviderProps): React.JSX.Element => {
  const [columns, setColumns] = useState<IGridConfigContext['columns']>([])

  return useMemo(() => {
    return (
      <GridConfigContext.Provider value={ { columns, setColumns } }>
        {children}
      </GridConfigContext.Provider>
    )
  }, [columns, children])
}
