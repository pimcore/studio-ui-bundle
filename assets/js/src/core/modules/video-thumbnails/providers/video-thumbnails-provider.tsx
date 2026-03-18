/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { createContext, useContext, useEffect, useState, useMemo, type ReactNode } from 'react'
import { useThumbnailVideoGetTreeQuery, type ThumbnailConfigurationData, type ThumbnailConfigurationFolderData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { isUndefined } from 'lodash'
import { ApiError, trackError } from '@sdk/modules/app'

interface VideoThumbnailsContextValue {
  thumbnailsData: {
    items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>
  } | undefined
  isLoading: boolean
  isFetching: boolean
  refetch: () => void
  expandedKeys: string[]
  setExpandedKeys: (keys: string[]) => void
}

const VideoThumbnailsContext = createContext<VideoThumbnailsContextValue | undefined>(undefined)

interface VideoThumbnailsProviderProps {
  children: ReactNode
}

export const VideoThumbnailsProvider = ({ children }: VideoThumbnailsProviderProps): React.JSX.Element => {
  const { data: thumbnailsData, isLoading, isFetching, refetch, error } = useThumbnailVideoGetTreeQuery()
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const contextValue: VideoThumbnailsContextValue = useMemo(() => ({
    thumbnailsData,
    isLoading,
    isFetching,
    refetch,
    expandedKeys,
    setExpandedKeys
  }), [thumbnailsData, isLoading, isFetching, refetch, expandedKeys, setExpandedKeys])

  return (
    <VideoThumbnailsContext.Provider value={ contextValue }>
      {children}
    </VideoThumbnailsContext.Provider>
  )
}

export const useVideoThumbnailsContext = (): VideoThumbnailsContextValue => {
  const context = useContext(VideoThumbnailsContext)
  if (context === undefined) {
    throw new Error('useVideoThumbnailsContext must be used within a VideoThumbnailsProvider')
  }
  return context
}
