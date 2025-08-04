/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useMemo, useState } from 'react'
import { type BundleSeoRedirectsImportStatistics } from '../seo-api-slice.gen'

export interface RedirectsContext {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  filter: string
  setFilter: React.Dispatch<React.SetStateAction<string>>
  isBeginnerModalOpen: boolean
  setIsBeginnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isImportModalOpen: boolean
  setIsImportModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isResultsModalOpen: boolean
  setIsResultsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  importResults: BundleSeoRedirectsImportStatistics | null
  setImportResults: React.Dispatch<React.SetStateAction<BundleSeoRedirectsImportStatistics | null>>
  exportLoading: boolean
  setExportLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const RedirectsContext = createContext<RedirectsContext>({
  currentPage: 1,
  setCurrentPage: () => {},
  pageSize: 50,
  setPageSize: () => {},
  filter: '',
  setFilter: () => {},
  isBeginnerModalOpen: false,
  setIsBeginnerModalOpen: () => {},
  isImportModalOpen: false,
  setIsImportModalOpen: () => {},
  isResultsModalOpen: false,
  setIsResultsModalOpen: () => {},
  importResults: null,
  setImportResults: () => {},
  exportLoading: false,
  setExportLoading: () => {}
})

export interface RedirectsProviderProps {
  children: React.ReactNode
}

export const RedirectsProvider = ({ children }: RedirectsProviderProps): React.JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [filter, setFilter] = useState<string>('')
  const [isBeginnerModalOpen, setIsBeginnerModalOpen] = useState<boolean>(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState<boolean>(false)
  const [importResults, setImportResults] = useState<BundleSeoRedirectsImportStatistics | null>(null)
  const [exportLoading, setExportLoading] = useState<boolean>(false)

  return useMemo(() => (
    <RedirectsContext.Provider value={ {
      currentPage,
      setCurrentPage,
      pageSize,
      setPageSize,
      filter,
      setFilter,
      isBeginnerModalOpen,
      setIsBeginnerModalOpen,
      isImportModalOpen,
      setIsImportModalOpen,
      isResultsModalOpen,
      setIsResultsModalOpen,
      importResults,
      setImportResults,
      exportLoading,
      setExportLoading
    } }
    >
      {children}
    </RedirectsContext.Provider>
  ), [
    currentPage,
    pageSize,
    filter,
    isBeginnerModalOpen,
    isImportModalOpen,
    isResultsModalOpen,
    importResults,
    exportLoading,
    children
  ])
}

export const useRedirectsContext = (): RedirectsContext => {
  const context = useContext(RedirectsContext)
  if (context === undefined) {
    throw new Error('useRedirectsContext must be used within a RedirectsProvider')
  }
  return context
}
