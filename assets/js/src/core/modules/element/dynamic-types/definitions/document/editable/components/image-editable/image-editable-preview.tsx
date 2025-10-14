/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo, useRef } from 'react'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { type ImageThumbnailSettings } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import { ResponsiveAssetPreview } from '../../helpers/responsive-asset-preview/responsive-asset-preview'
import { generateThumbnailUrl } from './utils/thumbnail-sizing'
import { isEqual, isNil } from 'lodash'

interface ImageEditablePreviewProps {
  assetId?: number
  width?: number | string
  height?: number | string
  containerWidth: number
  className?: string
  dropdownItems?: DropdownProps['menu']['items']
  thumbnailSettings?: ImageThumbnailSettings
  thumbnailConfig?: string | object
  imgAttributes?: Record<string, string>
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number, height: number } | null
  onImageLoadedChange?: (isLoaded: boolean) => void
}

export const ImageEditablePreview = ({
  assetId,
  width,
  height,
  containerWidth,
  thumbnailSettings,
  thumbnailConfig,
  onImageLoadedChange,
  ...props
}: ImageEditablePreviewProps): React.JSX.Element => {
  const cachedThumbnailUrlRef = useRef<string | undefined>(undefined)
  const cachedParamsRef = useRef<{
    assetId?: number
    width?: number | string
    height?: number | string
    thumbnailSettings?: ImageThumbnailSettings
    thumbnailConfig?: string | object
  }>({})

  const thumbnailUrl = useMemo(() => {
    if (isNil(assetId)) {
      cachedThumbnailUrlRef.current = undefined
      cachedParamsRef.current = {}
      return undefined
    }

    const needsContainerWidth = isNil(thumbnailConfig) && isNil(width) && isNil(height)
    if (needsContainerWidth && containerWidth <= 0) {
      return undefined
    }

    const currentParams = { assetId, width, height, thumbnailSettings, thumbnailConfig }
    const cachedParams = cachedParamsRef.current

    const hasContentChanged = !isEqual(currentParams, cachedParams)

    if (!isNil(cachedThumbnailUrlRef.current) && !hasContentChanged) {
      return cachedThumbnailUrlRef.current
    }

    const newThumbnailUrl = generateThumbnailUrl({
      assetId,
      width,
      height,
      containerWidth,
      thumbnailSettings,
      thumbnailConfig
    })

    cachedThumbnailUrlRef.current = newThumbnailUrl
    cachedParamsRef.current = currentParams

    return newThumbnailUrl
  }, [assetId, width, height, thumbnailSettings, thumbnailConfig, containerWidth])

  return (
    <ResponsiveAssetPreview
      { ...props }
      assetId={ assetId }
      thumbnailUrl={ thumbnailUrl }
    />
  )
}
