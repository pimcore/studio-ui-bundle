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
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useColumnMapper as defaultUseColumnMapper } from './use-column-mapper'
import { useSettings } from '../../../settings/use-settings'
// Search mode columns are merged here: the only layer below the general filters and sorting contexts.
import { useSearchModeAdditionalColumns } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/use-search-mode-additional-columns'
import { findRemovedColumns, getColumnIdentity, placeAdditionalColumns, type SearchModeColumnPlacement, type SearchModeColumnPlacements } from '@Pimcore/modules/element/listing/decorators/general-filters/search-modes/search-mode-columns'
import { SortingContext } from '@Pimcore/modules/element/listing/decorators/sorting/context-layer/provider/sorting-provider/sorting-provider'

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
  width?: number | null
  originalApiDefinition?: Record<string, any>
  meta?: Record<string, any>
}

export interface SelectedColumnsContextProps {
  /** The user's columns (grid configuration, saved search); the only list to persist. */
  selectedColumns: SelectedColumn[]
  /** selectedColumns plus columns of the applied search mode; render and request these, never persist them. */
  visibleColumns: SelectedColumn[]
  setSelectedColumns: (columns: SelectedColumn[]) => void
  /** Whether a visible column was added by the applied search mode. */
  isSearchModeColumn: (column: SelectedColumn) => boolean
  /** Session-only position and width of search mode columns; kept while the listing is mounted. */
  searchModeColumnPlacements: SearchModeColumnPlacements
  /** Merges placement changes, keyed by column identity (getColumnIdentity). */
  updateSearchModeColumnPlacements: (placements: Record<string, Partial<SearchModeColumnPlacement>>) => void
  encodeColumnIdentifier: (column: SelectedColumn) => string
  decodeColumnIdentifier: (columnIdentifier: string) => SelectedColumn | undefined
  shouldMapDataToColumn: (data: any, column: SelectedColumn) => boolean
}

export const SelectedColumnsContext = createContext<SelectedColumnsContextProps>({
  selectedColumns: [],
  visibleColumns: [],
  setSelectedColumns: () => {},
  isSearchModeColumn: () => false,
  searchModeColumnPlacements: {},
  updateSearchModeColumnPlacements: () => {},
  encodeColumnIdentifier: () => '',
  decodeColumnIdentifier: () => undefined,
  shouldMapDataToColumn: () => false
})

export interface SelectedColumnsProviderProps {
  children: React.ReactNode
  columns?: SelectedColumn[]
}

// When columns are controlled externally (e.g. ManyToManyObjectRelation), we skip
// useSettings (which requires SettingsProvider) and use the default column mapper directly.
const ControlledSelectedColumnsProvider = ({ children, columns }: { children: React.ReactNode, columns: SelectedColumn[] }): React.JSX.Element => {
  const columnMapper = defaultUseColumnMapper()

  const formattedSelectedColumns: SelectedColumn[] = useMemo(() => {
    return columns.map(column => ({
      ...column,
      key: column.originalApiDefinition?.__meta?.advancedColumnConfig?.title ?? column.key
    }))
  }, [columns])

  const encodeColumnIdentifier = (column: SelectedColumn): string => columnMapper.encodeColumnIdentifier(column)
  const decodeColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => columnMapper.decodeColumnIdentifier(columnIdentifier, formattedSelectedColumns)
  const shouldMapDataToColumn = (data: any, column: SelectedColumn): boolean => columnMapper.shouldMapDataToColumn(data, column)

  const contextValue = useMemo(() => ({
    selectedColumns: formattedSelectedColumns,
    visibleColumns: formattedSelectedColumns,
    setSelectedColumns: () => {},
    isSearchModeColumn: () => false,
    searchModeColumnPlacements: {},
    updateSearchModeColumnPlacements: () => {},
    encodeColumnIdentifier,
    decodeColumnIdentifier,
    shouldMapDataToColumn
  }), [formattedSelectedColumns])

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

  const formattedSelectedColumns: SelectedColumn[] = useMemo(() => {
    return selectedColumns.map(column => ({
      ...column,
      key: column.originalApiDefinition?.__meta?.advancedColumnConfig?.title ?? column.key
    })) ?? []
  }, [selectedColumns])

  const decodeSelectedColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => columnMapper.decodeColumnIdentifier(columnIdentifier, formattedSelectedColumns)
  const additionalColumns = useSearchModeAdditionalColumns(decodeSelectedColumnIdentifier)
  const [searchModeColumnPlacements, setSearchModeColumnPlacements] = useState<SearchModeColumnPlacements>({})
  const visibleColumns = useMemo(
    () => placeAdditionalColumns(formattedSelectedColumns, additionalColumns, searchModeColumnPlacements),
    [formattedSelectedColumns, additionalColumns, searchModeColumnPlacements]
  )
  const searchModeColumnIdentities = useMemo(() => {
    const selectedIdentities = new Set(formattedSelectedColumns.map(getColumnIdentity))
    return new Set(visibleColumns.map(getColumnIdentity).filter((identity) => !selectedIdentities.has(identity)))
  }, [formattedSelectedColumns, visibleColumns])

  const isSearchModeColumn = useCallback(
    (column: SelectedColumn): boolean => searchModeColumnIdentities.has(getColumnIdentity(column)),
    [searchModeColumnIdentities]
  )

  const updateSearchModeColumnPlacements = useCallback((updates: Record<string, Partial<SearchModeColumnPlacement>>): void => {
    setSearchModeColumnPlacements((current) => {
      const next = { ...current }
      for (const [identity, update] of Object.entries(updates)) {
        next[identity] = { ...current[identity], ...update }
      }
      return next
    })
  }, [])

  // when mode columns go away, drop sorts on columns that are no longer visible; otherwise the
  // stale sort would silently return (without a header indicator) once the mode is applied again
  const sortingContext = useContext(SortingContext)
  const previous = useRef({ visibleColumns, additionalColumns })
  useEffect(() => {
    const { visibleColumns: previousVisible, additionalColumns: previousAdditional } = previous.current
    previous.current = { visibleColumns, additionalColumns }

    if (sortingContext === undefined || previousAdditional === additionalColumns) {
      return
    }

    const removed = findRemovedColumns(previousVisible, visibleColumns)
    const sorting = sortingContext.sorting ?? []
    const kept = sorting.filter((sort) => columnMapper.decodeColumnIdentifier(sort.id, removed) === undefined)

    if (kept.length !== sorting.length) {
      sortingContext.setSorting(kept)
    }
  }, [visibleColumns])

  const encodeColumnIdentifier = (column: SelectedColumn): string => columnMapper.encodeColumnIdentifier(column)
  const decodeColumnIdentifier = (columnIdentifier: string): SelectedColumn | undefined => columnMapper.decodeColumnIdentifier(columnIdentifier, visibleColumns)
  const shouldMapDataToColumn = (data: any, column: SelectedColumn): boolean => columnMapper.shouldMapDataToColumn(data, column)

  const contextValue = useMemo(() => ({
    selectedColumns: formattedSelectedColumns,
    visibleColumns,
    setSelectedColumns,
    isSearchModeColumn,
    searchModeColumnPlacements,
    updateSearchModeColumnPlacements,
    encodeColumnIdentifier,
    decodeColumnIdentifier,
    shouldMapDataToColumn
  }), [formattedSelectedColumns, visibleColumns, isSearchModeColumn, searchModeColumnPlacements])

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
