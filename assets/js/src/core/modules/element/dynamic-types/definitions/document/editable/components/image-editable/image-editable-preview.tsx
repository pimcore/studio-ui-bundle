/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useMemo } from 'react'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { type ImageThumbnailSettings } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import { ResponsiveAssetPreview } from '../../helpers/responsive-asset-preview/responsive-asset-preview'
import { generateThumbnailUrl } from './utils/thumbnail-sizing'

interface ImageEditablePreviewProps {
  src?: string
  assetId?: number
  assetType?: 'image' | 'video'
  width?: number | string
  height?: number | string
  containerWidth: number
  className?: string
  dropdownItems?: DropdownProps['menu']['items']
  thumbnailSettings?: ImageThumbnailSettings
  imgAttributes?: Record<string, string>
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number, height: number } | null
}

export const ImageEditablePreview = ({
  src,
  assetId,
  assetType,
  width,
  height,
  containerWidth,
  thumbnailSettings,
  ...props
}: ImageEditablePreviewProps): React.JSX.Element => {
  const thumbnailUrl = useMemo(() => {
    if (assetId === undefined) {
      return undefined
    }

    return generateThumbnailUrl({
      assetId,
      assetType,
      width,
      height,
      containerWidth,
      thumbnailSettings,
      fallbackSrc: src
    })
  }, [assetId, src, width, height, assetType, thumbnailSettings, containerWidth])

  return (
    <ResponsiveAssetPreview
      { ...props }
      assetId={ assetId }
      src={ src }
      thumbnailUrl={ thumbnailUrl }
    />
  )
}
