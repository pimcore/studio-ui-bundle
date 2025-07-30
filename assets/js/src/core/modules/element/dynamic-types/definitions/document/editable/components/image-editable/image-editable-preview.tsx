/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type CSSProperties, useEffect, useMemo, useState, useRef } from 'react'
import { useStyle } from './image-editable-preview.styles'
import cn from 'classnames'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Image } from 'antd'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'
import { type ImageThumbnailSettings } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import { getAssetPreviewUrl } from '@Pimcore/components/image-preview/utils/get-asset-preview-url'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'
import { Card } from '@sdk/components'
import useElementResizeDimensions from '@Pimcore/utils/hooks/use-element-resize-dimensions'

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
  onImageResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number | string, height: number | string } | null
}

export const ImageEditablePreview = ({ 
  src, 
  assetId, 
  assetType, 
  width, 
  height, 
  containerWidth,
  className, 
  dropdownItems, 
  thumbnailSettings,
  imgAttributes,
  onImageLoad,
  onImageResize,
  lastImageDimensions
}: ImageEditablePreviewProps): React.JSX.Element => {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const [key, setKey] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  
  // Create ref for the image container to track resize
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const currentImageDimensions = useElementResizeDimensions(imageContainerRef)

  // Execute code when image container resizes
  useEffect(() => {
    if (currentImageDimensions.width > 0 && currentImageDimensions.height > 0 && onImageResize !== undefined) {
      onImageResize(currentImageDimensions)
    }
  }, [currentImageDimensions, onImageResize])

  const imageSrc = useMemo(() => {
    if (assetId === undefined) {
      return src
    }

    let thumbnailWidth: number | undefined
    let thumbnailHeight: number | undefined
    let resizeMode: 'resize' | 'none' | 'scaleByHeight' | 'scaleByWidth' | undefined

    // Apply thumbnail sizing rules:
    // - no width and height given: use containerWidth
    // - width given: use scaleByWidth with width
    // - no width given but height given: use scaleByHeight with height
    if (width === undefined && height === undefined) {
      thumbnailWidth = containerWidth
      resizeMode = 'scaleByWidth'
    } else if (width !== undefined) {
      thumbnailWidth = typeof width === 'string' ? parseInt(width) : width
      resizeMode = 'scaleByWidth'
    } else if (height !== undefined) {
      thumbnailHeight = typeof height === 'string' ? parseInt(height) : height
      resizeMode = 'scaleByHeight'
    }

    // Only generate URL if we have valid dimensions
    if (thumbnailWidth === undefined && thumbnailHeight === undefined) {
      return src
    }

    const defaultThumbnailSettings: ImageThumbnailSettings = {
      frame: false,
      resizeMode,
      ...thumbnailSettings
    }

    // Ensure we pass valid parameters to getAssetPreviewUrl
    if (thumbnailWidth !== undefined) {
      return getAssetPreviewUrl({
        assetId,
        assetType,
        width: thumbnailWidth,
        height: thumbnailHeight,
        thumbnailSettings: defaultThumbnailSettings
      })
    } else if (thumbnailHeight !== undefined) {
      return getAssetPreviewUrl({
        assetId,
        assetType,
        width: 0, // Use 0 for width when only height is specified
        height: thumbnailHeight,
        thumbnailSettings: defaultThumbnailSettings
      })
    }

    return src
  }, [assetId, src, width, height, assetType, thumbnailSettings, containerWidth])

  useEffect(() => {
    setKey(key + 1)
    setIsImageLoaded(false)
  }, [imageSrc])

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    setIsImageLoaded(true)
    onImageLoad?.(event)
  }

  const loadingSpinner = (
    <div
      className={styles.loadingSpinner}
    >
      <Spin size="small" />
    </div>
  )

  return (
    <Dropdown
      disabled={ isNil(dropdownItems) || dropdownItems.length === 0 }
      menu={ { items: dropdownItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        ref={imageContainerRef}
        className={ cn(className, styles.imageEditablePreviewContainer, ...getStateClasses()) }
      >

        { imageSrc !== undefined && (

            <Image
              className={ styles.imageComponent }
              fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
              key={ key }
              onLoad={ handleImageLoad }
              placeholder={ loadingSpinner }
              preview={ false }
              src={ imageSrc }

      style={{
        width: isImageLoaded ? undefined : lastImageDimensions?.width,
        height: isImageLoaded ? undefined : lastImageDimensions?.height
      }}
              {...imgAttributes}
            />
        ) }

        { isImageLoaded && <ImagePreviewDropdown dropdownItems={ dropdownItems } /> }
      </div>
    </Dropdown>
  )
}