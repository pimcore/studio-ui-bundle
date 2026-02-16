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
import { useThumbnailImageGetTreeQuery, type ThumbnailConfigurationData, type ThumbnailConfigurationFolderData } from '@Pimcore/modules/asset/editor/types/asset-thumbnails-api-slice.gen'
import { isUndefined } from 'lodash'
import { ApiError, trackError } from '@sdk/modules/app'

interface ImageThumbnailsContextValue {
  thumbnailsData: {
    items: Array<ThumbnailConfigurationData | ThumbnailConfigurationFolderData>
  } | undefined
  isLoading: boolean
  isFetching: boolean
  refetch: () => void
  expandedKeys: string[]
  setExpandedKeys: (keys: string[]) => void
}

const ImageThumbnailsContext = createContext<ImageThumbnailsContextValue | undefined>(undefined)

interface ImageThumbnailsProviderProps {
  children: ReactNode
}

export const ImageThumbnailsProvider = ({ children }: ImageThumbnailsProviderProps): React.JSX.Element => {
  const { data: thumbnailsData, isLoading, isFetching, refetch, error } = useThumbnailImageGetTreeQuery()
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])

  useEffect(() => {
    if (!isUndefined(error)) {
      trackError(new ApiError(error))
    }
  }, [error])

  const contextValue: ImageThumbnailsContextValue = useMemo(() => ({
    thumbnailsData,
    isLoading,
    isFetching,
    refetch,
    expandedKeys,
    setExpandedKeys
  }), [thumbnailsData, isLoading, isFetching, refetch, expandedKeys, setExpandedKeys])

  return (
    <ImageThumbnailsContext.Provider value={ contextValue }>
      {children}
    </ImageThumbnailsContext.Provider>
  )
}

export const useImageThumbnailsContext = (): ImageThumbnailsContextValue => {
  const context = useContext(ImageThumbnailsContext)
  if (context === undefined) {
    throw new Error('useImageThumbnailsContext must be used within an ImageThumbnailsProvider')
  }
  return context
}
