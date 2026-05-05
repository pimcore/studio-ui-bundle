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
import { type ManyToOneRelationValue } from '@Pimcore/components/many-to-one-relation/many-to-one-relation'
import { type RowSelectionState } from '@tanstack/react-table'
import { type ElementType } from '@Pimcore/types/enums/element/element-type'
import { api, type ElementUsageItem, type ElementUsageBaseItem } from '../../usage-api-slice-enhanced'
import { container } from '@Pimcore/app/depency-injection'
import { serviceIds } from '@Pimcore/app/config/services/service-ids'
import { type ExecutionEngine } from '@Pimcore/modules/execution-engine/services/execution-engine'
import { SearchReplaceAssignmentsJob } from '@Pimcore/modules/execution-engine/jobs/search-replace-assignments/search-replace-assignments-job'
import { useTranslation } from 'react-i18next'

interface SearchReplaceAssignmentsContextValue {
  // State
  searchFor: ManyToOneRelationValue | null
  replaceWith: ManyToOneRelationValue | null
  currentPage: number
  pageSize: number
  selectedRows: RowSelectionState
  defaultPageSize: number
  totalItems: number
  usageItems: ElementUsageItem[]
  isFetching: boolean
  isLoading: boolean
  isFormValid: boolean
  selectedRowsCount: number
  hasSelection: boolean
  hasHidden: boolean

  // Handlers
  handleSearchForChange: (value: ManyToOneRelationValue | null) => void
  handleReplaceWithChange: (value: ManyToOneRelationValue | null) => void
  handleSearch: () => void
  handlePageChange: (page: number, size: number) => void
  handleApplyToAll: () => void
  handleApplyToSelection: () => void
  handleRefresh: () => void
  handleClearSelection: () => void
  setSelectedRows: (selection: RowSelectionState) => void
}

const SearchReplaceAssignmentsContext = createContext<SearchReplaceAssignmentsContextValue | undefined>(undefined)

interface SearchReplaceAssignmentsProviderProps {
  children: ReactNode
}

export const SearchReplaceAssignmentsProvider = ({ children }: SearchReplaceAssignmentsProviderProps): React.JSX.Element => {
  const { t } = useTranslation()
  const defaultPageSize = 50
  const [searchFor, setSearchFor] = useState<ManyToOneRelationValue | null>(null)
  const [replaceWith, setReplaceWith] = useState<ManyToOneRelationValue | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize)
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})

  const executionEngine = container.get<ExecutionEngine>(serviceIds.executionEngine)
  const [trigger, { data, isFetching, isLoading }] = api.useLazyElementGetUsageQuery()

  useEffect(() => {
    if (searchFor !== null) {
      void trigger({
        id: searchFor.id,
        elementType: searchFor.type as ElementType,
        page: currentPage,
        pageSize,
        sortBy: 'id' as const,
        sortOrder: 'ASC' as const
      })
    }
  }, [currentPage, pageSize, trigger])

  const totalItems = data?.totalCount ?? 0
  const usageItems = data?.data ?? []
  const hasHidden = data?.hasHidden ?? false

  const handleSearchForChange = (value: ManyToOneRelationValue | null): void => {
    setSearchFor(value)
  }

  const handleReplaceWithChange = (value: ManyToOneRelationValue | null): void => {
    setReplaceWith(value)
  }

  const handleSearch = (): void => {
    if (searchFor !== null) {
      setCurrentPage(1)
      setSelectedRows({})
      void trigger({
        id: searchFor.id,
        elementType: searchFor.type as ElementType,
        page: 1,
        pageSize,
        sortBy: 'id' as const,
        sortOrder: 'ASC' as const
      })
    }
  }

  const handlePageChange = (page: number, size: number): void => {
    setCurrentPage(page)
    setPageSize(size)
  }

  const handleApplyToAll = async (): Promise<void> => {
    if (searchFor === null || replaceWith === null) {
      return
    }

    try {
      const job = new SearchReplaceAssignmentsJob({
        sourceElementType: searchFor.type as ElementType,
        sourceElementId: searchFor.id,
        targetElementType: replaceWith.type as ElementType,
        targetElementId: replaceWith.id,
        onFinish: () => {
          handleRefresh()
          setSelectedRows({})
        }
      })

      await executionEngine.runJob(job)
    } catch (error) {
      console.error('Failed to apply replacement to all items', error)
    }
  }

  const handleApplyToSelection = async (): Promise<void> => {
    if (searchFor === null || replaceWith === null) {
      return
    }

    try {
      const selectedIndices = Object.keys(selectedRows).map(Number)
      const selectedElements: ElementUsageBaseItem[] = selectedIndices.map(index => {
        const item = usageItems[index]
        return {
          id: item.id,
          type: (item.type === 'data-object' ? 'object' : item.type) as 'data-object' | 'object' | 'asset' | 'document'
        }
      })

      const job = new SearchReplaceAssignmentsJob({
        sourceElementType: searchFor.type as ElementType,
        sourceElementId: searchFor.id,
        targetElementType: replaceWith.type as ElementType,
        targetElementId: replaceWith.id,
        elements: selectedElements,
        onFinish: () => {
          handleRefresh()
          setSelectedRows({})
        }
      })

      await executionEngine.runJob(job)
    } catch (error) {
      console.error('Failed to apply replacement to all items', error)
    }
  }

  const handleRefresh = (): void => {
    if (searchFor !== null) {
      void trigger({
        id: searchFor.id,
        elementType: searchFor.type as ElementType,
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

  const contextValue: SearchReplaceAssignmentsContextValue = useMemo(() => ({
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
    hasHidden,

    // Handlers
    handleSearchForChange,
    handleReplaceWithChange,
    handleSearch,
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
    totalItems,
    usageItems,
    isFetching,
    isLoading,
    isFormValid,
    selectedRowsCount,
    hasSelection,
    hasHidden
  ])

  return (
    <SearchReplaceAssignmentsContext.Provider value={ contextValue }>
      {children}
    </SearchReplaceAssignmentsContext.Provider>
  )
}

export const useSearchReplaceAssignments = (): SearchReplaceAssignmentsContextValue => {
  const context = useContext(SearchReplaceAssignmentsContext)

  if (context === undefined) {
    throw new Error('useSearchReplaceAssignments must be used within a SearchReplaceAssignmentsProvider')
  }

  return context
}
