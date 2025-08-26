/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useState, useMemo } from 'react'
import { type ISidebarButton, type ISidebarEntry } from '@Pimcore/modules/element/sidebar/sidebar-manager'
import { type SidebarProps } from './sidebar'

export interface SidebarContextValue {
  entries: ISidebarEntry[]
  buttons: ISidebarButton[]
  sizing: 'large' | 'default'
  highlights: Array<ISidebarEntry['key']>
  activeTab: string
  setEntries: (entries: ISidebarEntry[]) => void
  setButtons: (buttons: ISidebarButton[]) => void
  setSizing: (sizing: 'large' | 'default') => void
  setHighlights: (highlights: Array<ISidebarEntry['key']>) => void
  setActiveTab: (activeTab: string) => void
  addEntry: (entry: ISidebarEntry) => void
  removeEntry: (key: string) => void
  addButton: (button: ISidebarButton) => void
  removeButton: (key: string) => void
  toggleHighlight: (key: string) => void
  openTab: (key: string) => void
  closeTab: () => void
  toggleTab: (key: string) => void
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined)

export interface SidebarProviderProps {
  children: React.ReactNode
  initialEntries?: ISidebarEntry[]
  initialButtons?: ISidebarButton[]
  initialSizing?: 'large' | 'default'
  initialHighlights?: Array<ISidebarEntry['key']>
  initialActiveTab?: string
}

export const SidebarProvider = ({ 
  children, 
  initialEntries = [],
  initialButtons = [],
  initialSizing = 'default',
  initialHighlights = [],
  initialActiveTab = ''
}: SidebarProviderProps): React.JSX.Element => {
  const [entries, setEntries] = useState<ISidebarEntry[]>(initialEntries)
  const [buttons, setButtons] = useState<ISidebarButton[]>(initialButtons)
  const [sizing, setSizing] = useState<'large' | 'default'>(initialSizing)
  const [highlights, setHighlights] = useState<Array<ISidebarEntry['key']>>(initialHighlights)
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab)

  const addEntry = (entry: ISidebarEntry): void => {
    setEntries(prev => {
      const existingIndex = prev.findIndex(e => e.key === entry.key)
      if (existingIndex !== -1) {
        const newEntries = [...prev]
        newEntries[existingIndex] = entry
        return newEntries
      }
      return [...prev, entry]
    })
  }

  const removeEntry = (key: string): void => {
    setEntries(prev => prev.filter(entry => entry.key !== key))
    if (activeTab === key) {
      setActiveTab('')
    }
  }

  const addButton = (button: ISidebarButton): void => {
    setButtons(prev => {
      const existingIndex = prev.findIndex(b => b.key === button.key)
      if (existingIndex !== -1) {
        const newButtons = [...prev]
        newButtons[existingIndex] = button
        return newButtons
      }
      return [...prev, button]
    })
  }

  const removeButton = (key: string): void => {
    setButtons(prev => prev.filter(button => button.key !== key))
  }

  const toggleHighlight = (key: string): void => {
    setHighlights(prev => 
      prev.includes(key) 
        ? prev.filter(h => h !== key)
        : [...prev, key]
    )
  }

  const openTab = (key: string): void => {
    if (entries.some(entry => entry.key === key)) {
      setActiveTab(key)
    }
  }

  const closeTab = (): void => {
    setActiveTab('')
  }

  const toggleTab = (key: string): void => {
    if (activeTab === key) {
      setActiveTab('')
    } else {
      setActiveTab(key)
    }
  }

  const contextValue = useMemo<SidebarContextValue>(() => ({
    entries,
    buttons,
    sizing,
    highlights,
    activeTab,
    setEntries,
    setButtons,
    setSizing,
    setHighlights,
    setActiveTab,
    addEntry,
    removeEntry,
    addButton,
    removeButton,
    toggleHighlight,
    openTab,
    closeTab,
    toggleTab
  }), [entries, buttons, sizing, highlights, activeTab])

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}
