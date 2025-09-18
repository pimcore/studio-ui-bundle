/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { type AvailableColumn } from '@Pimcore/modules/element/listing/decorators/utils/column-configuration/context-layer/provider/available-columns/available-columns-provider'
import React, { createContext, useMemo, useState } from 'react'
import { useSettings } from '../../../settings/use-settings'

export interface SelectedColumn {
  key?: string
  type: string
  config: any
  sortable: boolean
  editable: boolean
  localizable: boolean
  exportable?: boolean
  frontendType?: string
  locale?: string | null
  group?: AvailableColumn['group']
  originalApiDefinition?: Record<string, any>
  meta?: Record<string, any>
}

export interface SelectedColumnsContextProps {
  selectedColumns: SelectedColumn[]
  setSelectedColumns: (columns: SelectedColumn[]) => void
  encodeColumnIdentifier: (column: SelectedColumn) => string
  decodeColumnIdentifier: (columnIdentifier: string) => SelectedColumn | undefined
  shouldMapDataToColumn: (data: any, column: SelectedColumn) => boolean
}

export const SelectedColumnsContext = createContext<SelectedColumnsContextProps>({
  selectedColumns: [],
  setSelectedColumns: () => {},
  encodeColumnIdentifier: () => '',
  decodeColumnIdentifier: () => undefined,
  shouldMapDataToColumn: () => false
})

export interface SelectedColumnsProviderProps {
  children: React.ReactNode
}

export const SelectedColumnsProvider = ({ children }: SelectedColumnsProviderProps): React.JSX.Element => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumn[]>([])
  const { useColumnMapper } = useSettings()
  const columnMapper = useColumnMapper()

  const formattedSelectedColumns: SelectedColumn[] = useMemo(() => {
    return selectedColumns.map(column => ({
      ...column,
      key: column.originalApiDefinition?.__meta?.advancedColumnConfig?.title ?? column.key
    })) ?? []
  }, [selectedColumns])

  const encodeColumnIdentifier = (column: SelectedColumn): string => {
    return columnMapper.encodeColumnIdentifier(column)
  }

  const decodeColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => {
    return columnMapper.decodeColumnIdentifier(columnIdentifier, formattedSelectedColumns)
  }

  const shouldMapDataToColumn = (data: any, column: SelectedColumn): boolean => {
    return columnMapper.shouldMapDataToColumn(data, column)
  }

  return useMemo(() => (
    <SelectedColumnsContext.Provider value={ { selectedColumns: formattedSelectedColumns, setSelectedColumns, encodeColumnIdentifier, decodeColumnIdentifier, shouldMapDataToColumn } }>
      {children}
    </SelectedColumnsContext.Provider>
  ), [formattedSelectedColumns])
}
