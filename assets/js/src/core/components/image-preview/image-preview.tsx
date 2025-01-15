/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React, { type CSSProperties, forwardRef, type MutableRefObject, useEffect } from 'react'
import { useStyle } from './image-preview.styles'
import cn from 'classnames'
import { toCssDimension } from '@Pimcore/utils/css'
import { Image } from 'antd'
import { getPrefix } from '@Pimcore/app/api/pimcore/route'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { Spin } from '@Pimcore/components/spin/spin'
import { Flex } from '@Pimcore/components/flex/flex'
import { type DropdownProps } from '@Pimcore/components/dropdown/dropdown'
import { ImagePreviewDropdown } from '@Pimcore/components/image-preview/components/dropdown/dropdown'

interface ImagePreviewProps {
  src?: string
  assetId?: number
  assetType?: 'image' | 'video'
  className?: string
  width: number | string
  height: number | string
  style?: CSSProperties
  bordered?: boolean
  dropdownItems?: DropdownProps['menu']['items']
}

export const ImagePreview = forwardRef(function ImagePreview ({ src, assetId, assetType, width, height, className, style, dropdownItems, bordered = false }: ImagePreviewProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const [key, setKey] = React.useState(0)
  const [thumbnailDimensions, setThumbnailDimensions] = React.useState({ width: 0, height: 0 })
  const { getStateClasses } = useDroppable()
  const { styles } = useStyle()
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const getAssetPreviewUrl = (): string | undefined => {
    const { width, height } = thumbnailDimensions

    if (width === 0 || height === 0) {
      return undefined
    }

    if (assetType === 'video') {
      return `${getPrefix()}/assets/${assetId}/video/stream/image-thumbnail?width=${width}&height=${height}&frame=true&aspectRatio=true`
    }

    return `${getPrefix()}/assets/${assetId}/image/stream/custom?width=${width}&height=${height}&mimeType=JPEG&resizeMode=none&frame=true`
  }

  const imageSrc = assetId !== undefined ? getAssetPreviewUrl() : src

  useEffect(() => {
    if (wrapperRef?.current !== null && wrapperRef?.current !== undefined) {
      setThumbnailDimensions({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight
      })
    }
  }, [wrapperRef, width, height])

  useEffect(() => {
    setKey(key + 1)
  }, [imageSrc])

  const loadingSpinner = (
    <Flex
      align="center"
      className="h-full"
      justify="center"
    >
      <Spin size="small" />
    </Flex>
  )

  return (
    <div ref={ ref }>
      <div
        className={ cn(className, styles.imagePreviewContainer, bordered ? 'image-preview-bordered' : undefined, ...getStateClasses()) }
        ref={ wrapperRef }
        style={ {
          ...style,
          height: toCssDimension(height),
          width: toCssDimension(width)
        } }
      >
        { imageSrc !== undefined && (
          <Image
            className="w-full"
            fallback="/bundles/pimcorestudioui/img/fallback-image.svg"
            key={ key }
            placeholder={ loadingSpinner }
            preview={ false }
            src={ imageSrc }
          />
        ) }

        <ImagePreviewDropdown dropdownItems={ dropdownItems } />
      </div>
    </div>
  )
})
