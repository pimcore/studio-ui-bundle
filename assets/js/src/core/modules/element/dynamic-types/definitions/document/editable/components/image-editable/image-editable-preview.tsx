/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useStyle } from './image-editable-preview.styles'
import cn from 'classnames'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Image } from 'antd'
import { Spin } from '@Pimcore/components/spin/spin'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'
import { type ImageThumbnailSettings } from '@Pimcore/components/image-preview/utils/custom-image-thumbnail'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'
import useElementResizeDimensions from '@Pimcore/utils/hooks/use-element-resize-dimensions'
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
  onImageResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number, height: number } | null
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

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const currentImageDimensions = useElementResizeDimensions(imageContainerRef)

  useEffect(() => {
    if (currentImageDimensions.width > 0 && currentImageDimensions.height > 0 && onImageResize !== undefined) {
      onImageResize(currentImageDimensions)
    }
  }, [currentImageDimensions, onImageResize])

  const imageSrc = useMemo(() => {
    if (assetId === undefined) {
      return src
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

  useEffect(() => {
    setKey(key + 1)
    setIsImageLoaded(false)
  }, [imageSrc])

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    setIsImageLoaded(true)
    onImageLoad?.(event)
  }

  const loadingSpinner = (
    <div className={styles.loadingSpinner}>
      <Spin size="small" />
    </div>
  )

  return (
    <Dropdown
      disabled={isNil(dropdownItems) || dropdownItems.length === 0}
      menu={{ items: dropdownItems }}
      trigger={['contextMenu']}
    >
      <div
        className={cn(className, styles.imageEditablePreviewContainer, styles.imageEditablePreviewContainerMinSize, ...getStateClasses())}
        ref={imageContainerRef}
      >
        {imageSrc !== undefined && (
          <Image
            className={styles.imageComponent}
            fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
            key={key}
            onLoad={handleImageLoad}
            placeholder={loadingSpinner}
            preview={false}
            src={imageSrc}
            style={{
              width: isImageLoaded 
                ? undefined 
                : lastImageDimensions?.width 
                  ? Math.max(lastImageDimensions.width, 150)
                  : 150,
              height: isImageLoaded 
                ? undefined 
                : lastImageDimensions?.height 
                  ? Math.max(lastImageDimensions.height, 100)
                  : 100
            }}
            {...imgAttributes}
          />
        )}

        {isImageLoaded && <ImagePreviewDropdown dropdownItems={dropdownItems} />}
      </div>
    </Dropdown>
  )
}
