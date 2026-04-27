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
import React, { createContext, useCallback, useMemo, useState } from 'react'
import { useColumnMapper as defaultUseColumnMapper } from './use-column-mapper'
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
  columns?: SelectedColumn[]
}

type SetSelectedColumns = SelectedColumnsContextProps['setSelectedColumns']
type ColumnMapper = ReturnType<typeof defaultUseColumnMapper>

const NOOP_SET_SELECTED_COLUMNS: SetSelectedColumns = () => {}

const formatSelectedColumns = (columns: SelectedColumn[]): SelectedColumn[] => {
  return columns.map(column => ({
    ...column,
    key: column.originalApiDefinition?.__meta?.advancedColumnConfig?.title ?? column.key
  }))
}

const useSelectedColumnsContextValue = ({
  selectedColumns,
  setSelectedColumns,
  columnMapper
}: {
  selectedColumns: SelectedColumn[]
  setSelectedColumns: SetSelectedColumns
  columnMapper: ColumnMapper
}): SelectedColumnsContextProps => {
  const formattedSelectedColumns: SelectedColumn[] = useMemo(() => formatSelectedColumns(selectedColumns), [selectedColumns])

  const encodeColumnIdentifier = useCallback((column: SelectedColumn): string => {
    return columnMapper.encodeColumnIdentifier(column)
  }, [columnMapper])

  const decodeColumnIdentifier = useCallback((columnIdentifier: string): SelectedColumn | undefined => {
    return columnMapper.decodeColumnIdentifier(columnIdentifier, formattedSelectedColumns)
  }, [columnMapper, formattedSelectedColumns])

  const shouldMapDataToColumn = useCallback((data: any, column: SelectedColumn): boolean => {
    return columnMapper.shouldMapDataToColumn(data, column)
  }, [columnMapper])

  return useMemo(() => ({
    selectedColumns: formattedSelectedColumns,
    setSelectedColumns,
    encodeColumnIdentifier,
    decodeColumnIdentifier,
    shouldMapDataToColumn
  }), [
    decodeColumnIdentifier,
    encodeColumnIdentifier,
    formattedSelectedColumns,
    setSelectedColumns,
    shouldMapDataToColumn
  ])
}

// When columns are controlled externally (e.g. ManyToManyObjectRelation), we skip
// useSettings (which requires SettingsProvider) and use the default column mapper directly.
const ControlledSelectedColumnsProvider = ({ children, columns }: { children: React.ReactNode, columns: SelectedColumn[] }): React.JSX.Element => {
  const columnMapper = defaultUseColumnMapper()

  const contextValue = useSelectedColumnsContextValue({
    selectedColumns: columns,
    setSelectedColumns: NOOP_SET_SELECTED_COLUMNS,
    columnMapper
  })

  return (
    <SelectedColumnsContext.Provider value={ contextValue }>
      {children}
    </SelectedColumnsContext.Provider>
  )
}

const UncontrolledSelectedColumnsProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumn[]>([])
  const { useColumnMapper } = useSettings()
  const columnMapper = useColumnMapper()

  const contextValue = useSelectedColumnsContextValue({
    selectedColumns,
    setSelectedColumns,
    columnMapper
  })

  return (
    <SelectedColumnsContext.Provider value={ contextValue }>
      {children}
    </SelectedColumnsContext.Provider>
  )
}

export const SelectedColumnsProvider = ({ children, columns: controlledColumns }: SelectedColumnsProviderProps): React.JSX.Element => {
  if (controlledColumns !== undefined) {
    return <ControlledSelectedColumnsProvider columns={ controlledColumns }>{children}</ControlledSelectedColumnsProvider>
  }

  return <UncontrolledSelectedColumnsProvider>{children}</UncontrolledSelectedColumnsProvider>
}
