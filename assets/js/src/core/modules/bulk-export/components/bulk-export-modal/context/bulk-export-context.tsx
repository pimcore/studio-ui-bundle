/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { isUndefined } from 'lodash'

export interface BulkExportItem {
  type: string
  name: string
}

interface IBulkExportContext {
  open: () => void
  close: () => void
  isOpen: boolean
  selectedItems: BulkExportItem[]
  toggleItem: (type: string, name: string) => void
  selectAll: (items: BulkExportItem[]) => void
  deselectAll: () => void
  isSelected: (type: string, name: string) => boolean
}

const BulkExportContext = createContext<IBulkExportContext | undefined>(undefined)

export const BulkExportProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<BulkExportItem[]>([])

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

  const selectAll = useCallback((items: BulkExportItem[]): void => {
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
    <BulkExportContext.Provider value={ value }>
      {children}
    </BulkExportContext.Provider>
  )
}

export const useBulkExportContext = (): IBulkExportContext => {
  const context = useContext(BulkExportContext)

  if (isUndefined(context)) {
    throw new Error('useBulkExportContext must be used within a BulkExportProvider')
  }

  return context
}
