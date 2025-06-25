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
import { uuid } from '@Pimcore/utils/uuid'

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

  const _setColumns: IGridConfigContext['setColumns'] = (newColumns) => {
    // If newColumns is a function, call it with the current columns
    if (typeof newColumns === 'function') {
      const currentColumns = columns
      const updatedColumns = (newColumns as (columns: AvailableColumn[]) => AvailableColumn[])(currentColumns)
      setColumns(updatedColumns)
      return
    }

    // update columns with the same __meta.uniqueId if it exists else give it a new uuid
    const updatedColumns = (newColumns as AvailableColumn[]).map((column) => {
      if (column.__meta?.uniqueId) {
        return {
          ...column,
          __meta: {
            ...column.__meta,
            uniqueId: column.__meta.uniqueId
          }
        }
      }
      return {
        ...column,
        __meta: {
          ...column.__meta,
          uniqueId: column.__meta?.uniqueId ?? uuid()
        }
      }
    })

    setColumns(updatedColumns)
  }

  return useMemo(() => {
    return (
      <GridConfigContext.Provider value={ { columns, setColumns: _setColumns } }>
        {children}
      </GridConfigContext.Provider>
    )
  }, [columns, children])
}
