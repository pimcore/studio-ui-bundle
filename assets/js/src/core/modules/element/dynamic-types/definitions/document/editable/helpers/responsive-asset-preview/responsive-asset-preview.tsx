/**
 * This source file is available under the terms of the
 * Pimcore Open Core License (POCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (https://www.pimcore.com)
 *  @license    Pimcore Open Core License (POCL)
 */

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import cn from 'classnames'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { Image } from 'antd'
import { Spin } from '@Pimcore/components/spin/spin'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'
import { Dropdown } from '@Pimcore/components/dropdown/dropdown'
import { isNil } from 'lodash'
import { getImageDimensions } from './image-dimensions'
import useElementResize from '@Pimcore/utils/hooks/use-element-resize'
import { useStyle } from '../../components/image-editable/image-editable-preview.styles'

interface ResponsiveAssetPreviewProps {
  assetId?: number
  className?: string
  dropdownItems?: DropdownProps['menu']['items']
  dropClass?: string
  imgAttributes?: Record<string, string>
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onResize?: (dimensions: { width: number, height: number }) => void
  lastImageDimensions?: { width: number, height: number } | null
  thumbnailUrl?: string | null
  onImageLoadedChange?: (isLoaded: boolean) => void
}

export const ResponsiveAssetPreview = ({
  assetId,
  className,
  dropdownItems,
  dropClass,
  imgAttributes,
  onImageLoad,
  onResize,
  lastImageDimensions,
  thumbnailUrl,
  onImageLoadedChange
}: ResponsiveAssetPreviewProps): React.JSX.Element => {
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const keyRef = useRef(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const lastAssetIdRef = useRef<number | undefined>(assetId)
  const lastImageSrcRef = useRef<string | undefined>(undefined)

  const imageContainerRef = useRef<HTMLDivElement>(null)
  const currentImageDimensions = useElementResize(imageContainerRef)

  useEffect(() => {
    if (currentImageDimensions.width > 0 && currentImageDimensions.height > 0) {
      onResize?.(currentImageDimensions)
    }
  }, [currentImageDimensions, onResize])

  useEffect(() => {
    if (lastAssetIdRef.current !== assetId) {
      lastAssetIdRef.current = assetId
      keyRef.current = keyRef.current + 1
      setIsImageLoaded(false)
      onImageLoadedChange?.(false)
      lastImageSrcRef.current = undefined
    }
  }, [assetId, onImageLoadedChange])

  const finalImageSrc = useMemo(() => {
    if (assetId === undefined) {
      return undefined
    }
    return thumbnailUrl ?? undefined
  }, [assetId, thumbnailUrl])

  useEffect(() => {
    if (finalImageSrc !== lastImageSrcRef.current) {
      lastImageSrcRef.current = finalImageSrc
      keyRef.current = keyRef.current + 1
      setIsImageLoaded(false)
      onImageLoadedChange?.(false)
    }
  }, [finalImageSrc, onImageLoadedChange])

  const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>): void => {
    setIsImageLoaded(true)
    onImageLoadedChange?.(true)
    onImageLoad?.(event)
  }, [onImageLoad, onImageLoadedChange])

  const loadingSpinner = !isNil(lastImageDimensions)
    ? (
      <div className={ styles.loadingSpinner }>
        <Spin size="small" />
      </div>
      )
    : undefined

  return (
    <Dropdown
      disabled={ isNil(dropdownItems) || dropdownItems.length === 0 }
      dropClass={ dropClass }
      menu={ { items: dropdownItems } }
      trigger={ ['contextMenu'] }
    >
      <div
        className={ cn(
          className,
          styles.imageEditablePreviewContainer,
          {
            [styles.imageEditablePreviewContainerMinSize]: !isNil(lastImageDimensions) || isImageLoaded
          },
          ...getStateClasses()
        ) }
        ref={ imageContainerRef }
      >
        {finalImageSrc !== undefined && (
          <Image
            className={ styles.imageComponent }
            fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
            key={ keyRef.current }
            onLoad={ handleImageLoad }
            placeholder={ loadingSpinner }
            preview={ false }
            src={ finalImageSrc }
            style={ !isNil(lastImageDimensions) ? getImageDimensions(isImageLoaded, lastImageDimensions) : undefined }
            { ...imgAttributes }
          />
        )}

        {isImageLoaded && <ImagePreviewDropdown dropdownItems={ dropdownItems } />}
      </div>
    </Dropdown>
  )
}
