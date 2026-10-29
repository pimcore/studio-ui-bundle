/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import { useState, useCallback } from 'react'
import { isUndefined } from 'lodash'

/**
 * Sentinel key for the (single) create tab. A tab carrying this id opens the
 * editor in create mode; the container swaps it for the real server tab on a
 * successful POST.
 */
export const NEW_SERVER_KEY = '__new__'

export interface McpServerTab {
  id: string
  name: string
  writeable: boolean
  isDirty: boolean
}

export interface McpServerTabManager {
  tabs: McpServerTab[]
  activeTabKey: string | undefined
  openTab: (tab: Omit<McpServerTab, 'isDirty'>) => void
  closeTab: (key: string) => void
  setActiveTab: (key: string) => void
  markDirty: (key: string, dirty: boolean) => void
}

/**
 * The tab that becomes active when `key` closes: the one after it, or the one
 * before it when it was the last; undefined when no tab remains.
 */
const successorTabKey = (tabs: McpServerTab[], key: string): string | undefined => {
  const index = tabs.findIndex((entry) => entry.id === key)
  const remaining = tabs.filter((entry) => entry.id !== key)
  return remaining[Math.min(index, remaining.length - 1)]?.id
}

export function useMcpServerTabManager (): McpServerTabManager {
  const [tabs, setTabs] = useState<McpServerTab[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  const openTab = useCallback((tab: Omit<McpServerTab, 'isDirty'>) => {
    setTabs((prev) => {
      const exists = prev.find((entry) => entry.id === tab.id)
      if (!isUndefined(exists)) {
        setActiveTabKey(tab.id)
        return prev
      }
      setActiveTabKey(tab.id)
      return [...prev, { ...tab, isDirty: false }]
    })
  }, [])

  const closeTab = useCallback((key: string) => {
    setTabs((prev) => {
      const successor = successorTabKey(prev, key)
      // Functional update: the tab context menu closes several tabs in one batch
      // through the same callback, so a captured activeTabKey would be stale for
      // every close after the first and could leave a closed tab marked active.
      setActiveTabKey((current) => (current === key ? successor : current))
      return prev.filter((entry) => entry.id !== key)
    })
  }, [])

  const setActiveTab = useCallback((key: string) => {
    setActiveTabKey(key)
  }, [])

  const markDirty = useCallback((key: string, dirty: boolean) => {
    setTabs((prev) => {
      // No-op when the flag already holds, so a repeated report (the dirty effect
      // re-runs whenever its onDirtyChange identity changes) cannot churn state.
      const target = prev.find((entry) => entry.id === key)
      if (isUndefined(target) || target.isDirty === dirty) {
        return prev
      }
      return prev.map((entry) => (entry.id === key ? { ...entry, isDirty: dirty } : entry))
    })
  }, [])

  return {
    tabs,
    activeTabKey,
    openTab,
    closeTab,
    setActiveTab,
    markDirty
  }
}
