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
import { type ThumbnailConfigurationData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'

export interface ThumbnailTab {
  thumbnail: ThumbnailConfigurationData
  isDirty: boolean
}

export interface UseThumbnailTabManagerReturn {
  openedThumbnails: ThumbnailTab[]
  activeTabKey: string | undefined
  handleOpenThumbnail: (thumbnail: ThumbnailConfigurationData) => void
  handleCloseTab: (key: string) => void
  handleChangeTab: (key: string) => void
  handleTabDirtyChange: (key: string, isDirty: boolean) => void
  getModifiedThumbnailIds: () => string[]
}

export const useThumbnailTabManager = (): UseThumbnailTabManagerReturn => {
  const [openedThumbnails, setOpenedThumbnails] = useState<ThumbnailTab[]>([])
  const [activeTabKey, setActiveTabKey] = useState<string | undefined>(undefined)

  const handleOpenThumbnail = useCallback((thumbnail: ThumbnailConfigurationData): void => {
    const isAlreadyOpened = openedThumbnails.some(tab => tab.thumbnail.id === thumbnail.id)

    if (!isAlreadyOpened) {
      const newTab: ThumbnailTab = {
        thumbnail,
        isDirty: false
      }
      setOpenedThumbnails(prev => [...prev, newTab])
    }

    setActiveTabKey(thumbnail.id)
  }, [openedThumbnails])

  const handleCloseTab = useCallback((key: string): void => {
    setOpenedThumbnails(prev => {
      const targetIndex = prev.findIndex((tab) => tab.thumbnail.id === key)
      const updatedTabs = prev.filter((tab) => tab.thumbnail.id !== key)

      if (key === activeTabKey) {
        const prevTab = prev[targetIndex - 1]
        const nextTab = prev[targetIndex + 1]
        const newActiveKey = prevTab?.thumbnail.id ?? nextTab?.thumbnail.id
        setActiveTabKey(newActiveKey)
      }

      return updatedTabs
    })
  }, [activeTabKey])

  const handleChangeTab = useCallback((key: string): void => {
    setActiveTabKey(key)
  }, [])

  const handleTabDirtyChange = useCallback((key: string, isDirty: boolean): void => {
    setOpenedThumbnails(prev => prev.map(tab =>
      tab.thumbnail.id === key
        ? { ...tab, isDirty }
        : tab
    ))
  }, [])

  const getModifiedThumbnailIds = useCallback((): string[] => {
    return openedThumbnails
      .filter(tab => tab.isDirty)
      .map(tab => tab.thumbnail.id)
  }, [openedThumbnails])

  return {
    openedThumbnails,
    activeTabKey,
    handleOpenThumbnail,
    handleCloseTab,
    handleChangeTab,
    handleTabDirtyChange,
    getModifiedThumbnailIds
  }
}
