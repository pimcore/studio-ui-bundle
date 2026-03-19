/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { isUndefined } from 'lodash'
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

export interface BulkImportItem {
  type: string
  name: string
}

interface IBulkImportContext {
  open: () => void
  close: () => void
  isOpen: boolean
  selectedItems: BulkImportItem[]
  toggleItem: (type: string, name: string) => void
  selectAll: (items: BulkImportItem[]) => void
  deselectAll: () => void
  isSelected: (type: string, name: string) => boolean
}

const BulkImportContext = createContext<IBulkImportContext | undefined>(undefined)

export const BulkImportProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<BulkImportItem[]>([])

  const close = useCallback((): void => {
    setIsOpen(false)
    setSelectedItems([])
  }, [])

  const open = useCallback((): void => {
    if (!isOpen) {
      setIsOpen(true)
    }
  }, [isOpen])

  const toggleItem = useCallback((type: string, name: string): void => {
    setSelectedItems((prev) => {
      const exists = prev.some((item) => item.type === type && item.name === name)
      if (exists) {
        return prev.filter((item) => !(item.type === type && item.name === name))
      }
      return [...prev, { type, name }]
    })
  }, [])

  const selectAll = useCallback((items: BulkImportItem[]): void => {
    setSelectedItems(items)
  }, [])

  const deselectAll = useCallback((): void => {
    setSelectedItems([])
  }, [])

  const isSelected = useCallback((type: string, name: string): boolean => {
    return selectedItems.some((item) => item.type === type && item.name === name)
  }, [selectedItems])

  const value = useMemo(() => ({
    open,
    close,
    isOpen,
    selectedItems,
    toggleItem,
    selectAll,
    deselectAll,
    isSelected
  }), [open, close, isOpen, selectedItems, toggleItem, selectAll, deselectAll, isSelected])

  return (
    <BulkImportContext.Provider value={ value }>
      {children}
    </BulkImportContext.Provider>
  )
}

export const useBulkImportContext = (): IBulkImportContext => {
  const context = useContext(BulkImportContext)

  if (isUndefined(context)) {
    throw new Error('useBulkImportContext must be used within a BulkImportProvider')
  }

  return context
}
