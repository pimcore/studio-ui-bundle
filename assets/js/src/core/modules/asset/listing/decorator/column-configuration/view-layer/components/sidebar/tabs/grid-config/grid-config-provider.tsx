/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useState } from 'react'
import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'

export interface IGridConfigContext {
  columns: AvailableColumn[]
  setColumns: React.Dispatch<React.SetStateAction<AvailableColumn[]>>
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
