/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useState, type ReactNode, useMemo } from 'react'
import { isUndefined } from 'lodash'
import type { IGridFilter } from '@Pimcore/modules/reports/reports-view/types'
import { type FieldFiltersProps } from '@Pimcore/components/field-filters/field-filters'

interface IColumnsFiltersContext {
  columnsFilters: IGridFilter['columnFilters']
  setColumnsFilters: (columnFilter: IGridFilter['columnFilters']) => void
  fieldFilters: FieldFiltersProps['data']
  setFieldFilters: (fieldFilters: FieldFiltersProps['data']) => void
}

const ColumnsFiltersContext = createContext<IColumnsFiltersContext | undefined>(undefined)

interface IColumnsFiltersProviderProps {
  children: ReactNode
}

export const ColumnsFiltersProvider = ({ children }: IColumnsFiltersProviderProps): React.JSX.Element => {
  const [columnsFilters, setColumnsFilters] = useState<IGridFilter['columnFilters']>([])
  const [fieldFilters, setFieldFilters] = useState<FieldFiltersProps['data']>([])

  const contextValue = useMemo(() => ({
    columnsFilters,
    setColumnsFilters,
    fieldFilters,
    setFieldFilters
  }), [columnsFilters, setColumnsFilters, fieldFilters, setFieldFilters])

  return (
    <ColumnsFiltersContext.Provider value={ contextValue }>
      {children}
    </ColumnsFiltersContext.Provider>
  )
}

export const useColumnsFiltersContext = (): IColumnsFiltersContext => {
  const context = useContext(ColumnsFiltersContext)

  if (isUndefined(context)) {
    throw new Error('useColumnsFiltersContext must be used within a ColumnsFiltersProvider')
  }

  return context
}
