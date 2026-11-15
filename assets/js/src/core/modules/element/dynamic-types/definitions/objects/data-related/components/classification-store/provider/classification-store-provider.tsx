/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useCallback, useState, useMemo, useRef } from 'react'
import type { ClassificationStoreGroupLayout2 } from '@Pimcore/modules/data-object/classification-store/classification-store-api-slice.gen'

export interface ClassificationStoreContextData {
  isOpen: boolean
  open: () => void
  close: () => void
  setSearchValue: (tabId: string, value: string) => void
  getSearchValue: (tabId: string) => string
  currentLayoutData: ClassificationStoreGroupLayout2[]
  setCurrentLayoutData: (layoutData: ClassificationStoreGroupLayout2[]) => void
  markGroupsAsNew: (groupIds: string[]) => void
  isNewGroup: (groupId: string) => boolean
}

export const ClassificationStoreContext = createContext<ClassificationStoreContextData | undefined>(undefined)

export interface ClassificationStoreProviderProps {
  children: React.ReactNode
}

const ClassificationStoreProvider = ({ children }: ClassificationStoreProviderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValues, setSearchValues] = useState<Record<string, string>>({})
  const [currentLayoutData, setCurrentLayoutData] = useState<any>([])

  // Groups added through the selection modal during this session. They have no data
  // yet, so "hide empty data" must not hide their keys - the group would render
  // without a single editable field.
  const newGroupIdsRef = useRef<Set<string>>(new Set())

  const markGroupsAsNew = useCallback((groupIds: string[]): void => {
    groupIds.forEach((groupId) => newGroupIdsRef.current.add(groupId))
  }, [])

  const isNewGroup = useCallback((groupId: string): boolean => {
    return newGroupIdsRef.current.has(groupId)
  }, [])

  const getSearchValue = useCallback((tabId: string): string => {
    return searchValues[tabId] ?? ''
  }, [searchValues])

  const setSearchValue = useCallback((tabId: string, value: string): void => {
    setSearchValues(prev => ({
      ...prev,
      [tabId]: value
    }))
  }, [])

  const open = (): void => { setIsOpen(true) }

  const close = (): void => { setIsOpen(false) }

  const contextValue = useMemo(() => ({
    isOpen,
    open,
    close,
    getSearchValue,
    setSearchValue,
    currentLayoutData,
    setCurrentLayoutData,
    markGroupsAsNew,
    isNewGroup
  }), [getSearchValue, setSearchValue, isOpen, open, close, currentLayoutData, setCurrentLayoutData, markGroupsAsNew, isNewGroup])

  return (
    <ClassificationStoreContext.Provider value={ contextValue }>
      {children}
    </ClassificationStoreContext.Provider>
  )
}

export default ClassificationStoreProvider
