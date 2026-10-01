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
import { type ColumnDef } from '@tanstack/react-table'
import type { RelationFilterColumn, VisibleFieldsMap } from '../types'
import { buildVisibleFieldsMap } from '../utils/filter-columns'
import { useFilterableColumns } from '../hooks/use-filterable-columns'

export interface RelationFilterColumnsContext {
  columns: RelationFilterColumn[]
  visibleFieldsMap?: VisibleFieldsMap
  getFilterColumn: (columnId: string) => RelationFilterColumn | undefined
}

const EMPTY_CONTEXT: RelationFilterColumnsContext = {
  columns: [],
  getFilterColumn: () => undefined
}

const RelationFilterColumnsContextInstance = createContext<RelationFilterColumnsContext | undefined>(undefined)

/**
 * Filterable columns of the surrounding relation grid. Falls back to an empty
 * set outside of a provider, so the grid stays usable when rendered standalone.
 */
export const useRelationFilterColumns = (): RelationFilterColumnsContext => {
  return useContext(RelationFilterColumnsContextInstance) ?? EMPTY_CONTEXT
}

export interface RelationFilterColumnsProviderProps {
  children: React.ReactNode
  enabled: boolean
  columnDefinition?: Array<ColumnDef<any>>
  visibleFieldsValue?: Array<Record<string, any> | undefined>
}

export const RelationFilterColumnsProvider = ({ children, enabled, columnDefinition, visibleFieldsValue }: RelationFilterColumnsProviderProps): React.JSX.Element => {
  const columns = useFilterableColumns({ enabled, columnDefinition })
  const visibleFieldsMap = useMemo(() => buildVisibleFieldsMap(visibleFieldsValue), [visibleFieldsValue])

  const context = useMemo<RelationFilterColumnsContext>(() => ({
    columns,
    visibleFieldsMap,
    getFilterColumn: (columnId) => columns.find((column) => column.key === columnId)
  }), [columns, visibleFieldsMap])

  return (
    <RelationFilterColumnsContextInstance.Provider value={ context }>
      {children}
    </RelationFilterColumnsContextInstance.Provider>
  )
}
