/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, type ReactNode, useState, useEffect, useMemo } from 'react'
import { type ManyToOneRelationValueType } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { type RowSelectionState } from '@tanstack/react-table'
import { api } from '../../usage-api-slice.gen'

interface SearchReplaceContextValue {
  // State
  searchFor: ManyToOneRelationValueType
  replaceWith: ManyToOneRelationValueType
  currentPage: number
  pageSize: number
  selectedRows: RowSelectionState
  defaultPageSize: number
  totalItems: number
  usageItems: any[]
  isFetching: boolean
  isLoading: boolean
  isFormValid: boolean
  selectedRowsCount: number
  hasSelection: boolean

  // Handlers
  handleSearchForChange: (value: ManyToOneRelationValueType) => void
  handleReplaceWithChange: (value: ManyToOneRelationValueType) => void
  handlePageChange: (page: number, size: number) => void
  handleApplyToAll: () => void
  handleApplyToSelection: () => void
  handleRefresh: () => void
  handleClearSelection: () => void
  setSelectedRows: (selection: RowSelectionState) => void
}

const SearchReplaceContext = createContext<SearchReplaceContextValue | undefined>(undefined)

interface SearchReplaceProviderProps {
  children: ReactNode
}

export const SearchReplaceProvider = ({ children }: SearchReplaceProviderProps): React.JSX.Element => {
  const defaultPageSize = 50
  const [searchFor, setSearchFor] = useState<ManyToOneRelationValueType>(null)
  const [replaceWith, setReplaceWith] = useState<ManyToOneRelationValueType>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize)
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  const [trigger, { data, isFetching, isLoading }] = api.useLazyElementGetUsageQuery()

  useEffect(() => {
    if (searchFor !== null && 'id' in searchFor && searchFor.id !== undefined) {
      const elementType = 'type' in searchFor ? searchFor.type : 'data-object'
      void trigger({
        id: searchFor.id,
        elementType: elementType as 'data-object' | 'asset' | 'document',
        page: currentPage,
        pageSize,
        sortBy: 'id' as const,
        sortOrder: 'ASC' as const
      })
    }
  }, [searchFor, currentPage, pageSize, trigger])

  const totalItems = data?.totalCount ?? 0
  const usageItems = data?.data ?? []

  const handleSearchForChange = (value: ManyToOneRelationValueType): void => {
    setSearchFor(value)
    setCurrentPage(1)
    setSelectedRows({})
  }

  const handleReplaceWithChange = (value: ManyToOneRelationValueType): void => {
    setReplaceWith(value)
  }

  const handlePageChange = (page: number, size: number): void => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const handleApplyToAll = (): void => {
    // TODO: Implement apply replacement to all
    console.log('Apply to all', { searchFor, replaceWith })
  }

  const handleApplyToSelection = (): void => {
    // TODO: Implement apply replacement to selection
    console.log('Apply to selection', { searchFor, replaceWith, selectedRows })
  }

  const handleRefresh = (): void => {
    if (searchFor !== null && 'id' in searchFor && searchFor.id !== undefined) {
      const elementType = 'type' in searchFor ? searchFor.type : 'data-object'
      void trigger({
        id: searchFor.id,
        elementType: elementType as 'data-object' | 'asset' | 'document',
        page: currentPage,
        pageSize,
        sortBy: 'id' as const,
        sortOrder: 'ASC' as const
      })
    }
  }

  const handleClearSelection = (): void => {
    setSelectedRows({})
  }

  const isFormValid = searchFor !== null && replaceWith !== null
  const selectedRowsCount = Object.keys(selectedRows).length
  const hasSelection = selectedRowsCount > 0

  const contextValue: SearchReplaceContextValue = useMemo(() => ({
    // State
    searchFor,
    replaceWith,
    currentPage,
    pageSize,
    selectedRows,
    defaultPageSize,
    totalItems,
    usageItems,
    isFetching,
    isLoading,
    isFormValid,
    selectedRowsCount,
    hasSelection,

    // Handlers
    handleSearchForChange,
    handleReplaceWithChange,
    handlePageChange,
    handleApplyToAll,
    handleApplyToSelection,
    handleRefresh,
    handleClearSelection,
    setSelectedRows
  }), [
    searchFor,
    replaceWith,
    currentPage,
    pageSize,
    selectedRows,
    defaultPageSize,
    totalItems,
    usageItems,
    isFetching,
    isLoading,
    isFormValid,
    selectedRowsCount,
    hasSelection,
    handleSearchForChange,
    handleReplaceWithChange,
    handlePageChange,
    handleApplyToAll,
    handleApplyToSelection,
    handleRefresh,
    handleClearSelection,
    setSelectedRows
  ])

  return (
    <SearchReplaceContext.Provider value={ contextValue }>
      {children}
    </SearchReplaceContext.Provider>
  )
}

export const useSearchReplace = (): SearchReplaceContextValue => {
  const context = useContext(SearchReplaceContext)

  if (context === undefined) {
    throw new Error('useSearchReplace must be used within a SearchReplaceProvider')
  }

  return context
}
