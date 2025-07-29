/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { type CSSProperties, useEffect, useMemo, useState } from 'react'
import { useStyle } from './responsive-image-preview.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Image } from 'antd'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'
import { type ImageThumbnailSettings } from './utils/custom-image-thumbnail'
import { getAssetPreviewUrl } from './utils/get-asset-preview-url'
import useElementVisible from '@Pimcore/utils/hooks/use-element-visible'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'

interface ResponsiveImagePreviewProps {
  src?: string
  assetId?: number
  assetType?: 'image' | 'video'
  width?: number | string
  height?: number | string
  className?: string
  style?: CSSProperties
  dropdownItems?: DropdownProps['menu']['items']
  bordered?: boolean
  thumbnailSettings?: ImageThumbnailSettings
}

export const ResponsiveImagePreview = ({ 
  src, 
  assetId, 
  assetType, 
  width = '100%', 
  height, 
  className, 
  style, 
  dropdownItems, 
  bordered = false, 
  thumbnailSettings 
}: ResponsiveImagePreviewProps): React.JSX.Element => {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const [key, setKey] = useState(0)
  const [thumbnailDimensions, setThumbnailDimensions] = useState({ width: 0, height: 0 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [actualImageDimensions, setActualImageDimensions] = useState<{ width: number, height: number } | null>(null)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const imageSrc = useMemo(() => {
    if (assetId === undefined) {
      return src
    }

    const defaultThumbnailSettings: ImageThumbnailSettings = {
      frame: false,
      resizeMode: height === undefined ? 'scaleByWidth' : undefined,
      ...(height !== undefined && { contain: true }),
      ...thumbnailSettings
    }

    return getAssetPreviewUrl({
      assetId,
      assetType,
      width: thumbnailDimensions.width,
      height: height === undefined ? undefined : thumbnailDimensions.height,
      thumbnailSettings: defaultThumbnailSettings
    })
  }, [assetId, src, thumbnailDimensions, assetType, thumbnailSettings, height])

  const isVisible = useElementVisible(wrapperRef)

  useEffect(() => {
    if (isVisible && wrapperRef?.current !== null && wrapperRef?.current !== undefined) {
      const rect = wrapperRef.current.getBoundingClientRect()
      const computedWidth = typeof width === 'string' && width === '100%' 
        ? rect.width 
        : typeof width === 'string' 
          ? parseInt(width) 
          : width as number
      
      let computedHeight = 0
      if (height !== undefined) {
        computedHeight = typeof height === 'string' 
          ? parseInt(height) 
          : height as number
      }

      setThumbnailDimensions({
        width: computedWidth,
        height: computedHeight
      })
    }
  }, [isVisible, width, height])

  useEffect(() => {
    setKey(key + 1)
    setIsImageLoaded(false)
  }, [imageSrc])

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = event.target as HTMLImageElement
    setActualImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    })
    setIsImageLoaded(true)
  }

  const loadingSpinner = (
    <Flex
      align="center"
      className={ styles.loadingContainer }
      justify="center"
    >
      <Spin size="small" />
    </Flex>
  )

  const containerStyle: CSSProperties = useMemo(() => {
    if (actualImageDimensions !== null) {
      return {
        ...style,
        width: actualImageDimensions.width,
        height: actualImageDimensions.height
      }
    }

    return {
      ...style,
      width: toCssDimension(width),
      height: toCssDimension(height, 200)
    }
  }, [actualImageDimensions, style, width, height])

  return (
    <Dropdown
      disabled={ isNil(dropdownItems) || dropdownItems.length === 0 }
      menu={ { items: dropdownItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        className={ cn(className, styles.responsiveImagePreviewContainer, bordered ? 'image-preview-bordered' : undefined, ...getStateClasses()) }
        ref={ wrapperRef }
        style={ containerStyle }
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
          />
        ) }

        { isImageLoaded && <ImagePreviewDropdown dropdownItems={ dropdownItems } /> }
      </div>
    </Dropdown>
  )
}

export * from './utils/custom-image-thumbnail'